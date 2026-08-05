const LOGIN_URL = "https://tendo.net/advanced/login.php?url=/advanced/app/ritsumeigyo/index.php";
const RES_URL = "https://tendo.net/advanced/app/ritsumeigyo/res.php";

const HALL_KEYS = [
  ["oedo", "大江戸"],
  ["odaiba", "お台場"],
  ["haneda", "羽田"],
  ["kanagawa", "かながわ"],
  ["fujisan", "富士山"],
  ["sunten", "駿天"],
  ["saitama", "埼玉"],
  ["chiba", "千葉"],
  ["yamanashi", "山梨"],
];

const HISTORY_CEREMONIES = [
  ["senju", "第14回泉珠収天護摩供"],
  ["chiku", "第24回大元地空護摩供"],
  ["kaikou", "第26回界光宇炎護摩供"],
  ["myou", "第31回八大明王護摩供"],
  ["jizou", "第30回地蔵尊王護摩供"],
  ["ryuge", "第13回龍華大圓護摩供（陽）"],
  ["segaki", "第30回施餓鬼供養護摩供"],
  ["chimei", "第17回治命普済護摩供"],
  ["gyokuji", "第24回玉璽大環天護摩供"],
  ["hokuto", "北斗鎮圧護摩供"],
  ["rokuson", "禄存宝珠護摩供"],
  ["kokufu", "国父の日"],
  ["chosei", "長生南十字星護摩供"],
  ["myozen", "妙善閻魔天王護摩供"],
  ["shuten", "収天大龍華祭"],
  ["chinkon", "鎮魂四海龍王護摩供"],
  ["senju15", "第15回泉珠収天護摩供"],
];

export async function onRequestPost({ request, env }) {
  try {
    const { year, ceremonyName, history } = await request.json();
    const username = env.ADVANCED_USERNAME;
    const password = env.ADVANCED_PASSWORD;
    if (!username || !password) {
      return json({ error: "アドバンスドの接続情報がCloudflareに設定されていません。" }, 500);
    }
    if (!year || (!ceremonyName && !history)) {
      return json({ error: "対象年と護摩供名が必要です。" }, 400);
    }

    const jar = {};
    const loginPage = await fetchWithCookies(LOGIN_URL, { method: "GET" }, jar);
    const loginHtml = await loginPage.text();
    const token = loginHtml.match(/name=["']token["'][^>]*value=["']([^"']+)["']/)?.[1];
    if (!token) return json({ error: "ログイントークンを取得できませんでした。" }, 502);

    const form = new URLSearchParams();
    form.set("ses_user", username);
    form.set("ses_password", password);
    form.set("url", "/advanced/app/ritsumeigyo/index.php");
    form.set("token", token);
    form.set("ses_login", "ログイン");

    const loginRes = await fetchWithCookies(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      redirect: "manual",
    }, jar);

    if (loginRes.status >= 300 && loginRes.status < 400 && loginRes.headers.get("location")) {
      await fetchWithCookies(new URL(loginRes.headers.get("location"), LOGIN_URL).toString(), { method: "GET" }, jar);
    } else {
      const html = await loginRes.clone().text();
      if (html.includes("アドバンスドログイン") && !html.includes("オンライン立命行")) {
        return json({ error: "アドバンスドにログインできませんでした。" }, 401);
      }
    }

    const gomaList = await postAdvancedJson(jar, { year: String(year) });
    if (!Array.isArray(gomaList)) return json({ error: "行事一覧を取得できませんでした。" }, 502);

    if (history) {
      const ceremonies = [];
      for (const [key, name] of HISTORY_CEREMONIES) {
        const item = findCeremony(gomaList, name);
        if (!item) continue;
        const reports = await postAdvancedJson(jar, { goma_year: String(year), goma_id: item.ID });
        if (!Array.isArray(reports)) continue;
        ceremonies.push({
          key,
          name: item.GOMA_NAME,
          date: item.GOMA_DATE,
          deadline: item.DUE_DATE,
          halls: mapReports(reports),
        });
      }
      return json({ ceremonies, fetchedAt: new Date().toISOString() });
    }

    const ceremony = findCeremony(gomaList, ceremonyName);
    if (!ceremony) {
      return json({
        error: "一致する行事が見つかりませんでした。",
        available: gomaList.map((item) => item.GOMA_NAME).filter(Boolean),
      }, 404);
    }

    const reports = await postAdvancedJson(jar, {
      goma_year: String(year),
      goma_id: ceremony.ID,
    });
    if (!Array.isArray(reports)) return json({ error: "参加者一覧を取得できませんでした。" }, 502);

    return json({
      ceremony: {
        id: ceremony.ID,
        name: ceremony.GOMA_NAME,
        date: ceremony.GOMA_DATE,
        deadline: ceremony.DUE_DATE,
      },
      halls: mapReports(reports),
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    return json({ error: error.message || "取得に失敗しました。" }, 500);
  }
}

async function postAdvancedJson(jar, payload) {
  const res = await fetchWithCookies(RES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }, jar);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text.slice(0, 120) || "アドバンスドAPIの応答を読めませんでした。");
  }
}

async function fetchWithCookies(url, init, jar) {
  const headers = new Headers(init.headers || {});
  const cookie = cookieHeader(jar);
  if (cookie) headers.set("Cookie", cookie);
  const res = await fetch(url, { ...init, headers });
  storeCookies(res.headers, jar);
  return res;
}

function storeCookies(headers, jar) {
  const cookies = headers.getSetCookie ? headers.getSetCookie() : splitSetCookie(headers.get("set-cookie"));
  cookies.forEach((cookie) => {
    const [pair] = cookie.split(";");
    const index = pair.indexOf("=");
    if (index > 0) jar[pair.slice(0, index).trim()] = pair.slice(index + 1).trim();
  });
}

function splitSetCookie(value) {
  if (!value) return [];
  return value.split(/,(?=[^;,]+=)/);
}

function cookieHeader(jar) {
  return Object.entries(jar).map(([key, value]) => `${key}=${value}`).join("; ");
}

function findCeremony(list, ceremonyName) {
  const compactTarget = compact(ceremonyName);
  return list.find((item) => compact(item.GOMA_NAME) === compactTarget)
    || list.find((item) => compactTarget.includes(compact(item.GOMA_NAME)) || compact(item.GOMA_NAME).includes(compactTarget));
}

function compact(value) {
  return String(value || "")
    .replace(/[ 　]/g, "")
    .replace(/（.*?）/g, "")
    .replace(/\(.*?\)/g, "");
}

function mapReports(reports) {
  const mapped = Object.fromEntries(HALL_KEYS.map(([key]) => [key, { ritsumei: [], kuyo: [], reporter: "", reportedAt: "" }]));
  reports.forEach((report) => {
    const hallKey = HALL_KEYS.find(([, label]) => String(report.NAME_C || "").includes(label))?.[0];
    if (!hallKey) return;
    mapped[hallKey] = {
      ritsumei: lines(report.RITSUMEIGYO),
      kuyo: lines(report.KUYOUE),
      reporter: report.NAME || "",
      reportedAt: report.TIME_STAMP || "",
    };
  });
  return mapped;
}

function lines(value) {
  return [...new Set(String(value || "")
    .split(/\r?\n/)
    .map((line) => correctParticipantName(line.trim()))
    .filter(Boolean))];
}

function correctParticipantName(name) {
  const compactName = name.replace(/[ 　]/g, "");
  return compactName === "石破福子" || compactName === "石橋福子" ? "石橋　福子" : name;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
