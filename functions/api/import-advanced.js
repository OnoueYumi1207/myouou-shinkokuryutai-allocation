const LOGIN_URL = "https://tendo.net/advanced/login.php?url=/advanced/app/ritsumeigyo/index.php";
const RES_URL = "https://tendo.net/advanced/app/ritsumeigyo/res.php";
const ADVANCED_USERNAME = "shigurenoki";

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

export async function onRequestPost({ request, env }) {
  try {
    const { year, ceremonyName } = await request.json();
    const password = env.ADVANCED_PASSWORD;
    if (!password) {
      return json({ error: "アドバンスドのパスワードがCloudflareに設定されていません。" }, 500);
    }
    if (!year || !ceremonyName) {
      return json({ error: "対象年と護摩供名が必要です。" }, 400);
    }

    const jar = {};
    const loginPage = await fetchWithCookies(LOGIN_URL, { method: "GET" }, jar);
    const loginHtml = await loginPage.text();
    const token = loginHtml.match(/name=["']token["'][^>]*value=["']([^"']+)["']/)?.[1];
    if (!token) return json({ error: "ログイントークンを取得できませんでした。" }, 502);

    const form = new URLSearchParams();
    form.set("ses_user", ADVANCED_USERNAME);
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
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
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
