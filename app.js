const HALLS = [
  ["oedo", "大江戸", "守屋 正裕"],
  ["odaiba", "お台場", "三國友美"],
  ["haneda", "羽田", "樫村百合子"],
  ["kanagawa", "かながわ", "道城一隆"],
  ["fujisan", "富士山", "三上ますみ"],
  ["sunten", "駿天", "新井文美"],
  ["saitama", "埼玉", "酒巻保江"],
  ["chiba", "千葉", "仲野健一"],
  ["yamanashi", "山梨", "米倉三穂"],
];

const CEREMONIES = [
  ["senju", "第14回泉珠収天護摩供", "2026-01-01"],
  ["chiku", "第24回大元地空護摩供", "2026-01-01"],
  ["kaikou", "第26回界光宇炎護摩供", "2026-01-01"],
  ["myou", "第31回八大明王護摩供", "2026-01-01"],
  ["jizou", "第30回地蔵尊王護摩供", "2026-01-01"],
  ["ryuge", "第13回龍華大圓護摩供（陽）", "2026-01-01"],
  ["segaki", "第30回施餓鬼供養護摩供", "2026-08-09"],
  ["chimei", "第17回治命普済護摩供", "2026-08-16"],
  ["gyokuji", "第24回玉璽大環天護摩供", "2026-08-30"],
];

const INITIAL_COUNTS = {
  oedo: [10, 1],
  odaiba: [21, 13],
  haneda: [50, 31],
  kanagawa: [26, 0],
  fujisan: [5, 32],
  sunten: [8, 13],
  saitama: [18, 34],
  chiba: [58, 23],
  yamanashi: [17, 12],
};

const PRESET_NAMES = {
  oedo: {
    ritsumei: ["今田ミサ子", "石橋福子", "守屋正裕", "村上勝", "岡本千穂", "高濱仁美", "天野公子", "新野惠里乃", "中野寿恵", "高木詔治"],
    kuyo: ["齋藤久子"],
  },
  odaiba: {
    ritsumei: ["芦田裕善", "武藤哲也", "小川昌昭", "横澤博明", "三國玄洋", "荒木芳一", "荒木雄一郎", "武藤友紀", "三國友美", "三國天音", "野村香與", "牧博子", "四方聖子", "河本ひとみ", "小川佐知子", "横澤亜紀子", "松川栗実", "荒木幸子", "工藤法子", "工藤順子", "國吉綾乃"],
    kuyo: ["佐藤弦美", "塩越浩之", "塩越直子", "工藤美代子", "竹中亮子", "錦織優旗", "錦織美咲", "吉田洋司", "吉田祥子", "岡聡美", "岡宏一", "岡茉菜絵", "工藤有子"],
  },
  haneda: {
    ritsumei: ["友田真吾", "時任竹是", "小林元信", "小林隆二", "千代田隆", "宮田篤彦", "海老原泰太", "森田安弘", "山本隼生", "友田由美", "時任正美", "石黒貴子", "小林昭子", "小林あい", "永井量子", "富澤奈津江", "山岸千鶴", "梶野京子", "梶野知佳", "樫村百合子", "根本真由美", "宮田直美", "南條みどり", "片野博子", "片野遥", "新井恵里", "猪熊典子", "田口加奈子", "松山祐子", "大原尚子", "百瀬久美子", "梅澤久美子", "梅澤啓太", "梅澤碧", "黒木奈波", "大野正枝", "山本直子", "山本那生", "飯田悦子", "伊古田千鶴子", "時任晴央", "藤井通子", "藤井元樹", "藤井理沙", "永井歳子", "永井鈴子", "菊池政一", "中川弘恵", "丸山繁", "菊池政一"],
    kuyo: ["岡田和也", "時任晶央", "時任智央", "石黒健司", "石黒基以", "石黒百果", "石黒康平", "権山和晃", "権山舞", "根本拓弥", "根本武", "根本まさ子", "樫村有", "樫村こと子", "若山千春", "友田光", "友田空", "友田夕里加", "友田菜穂", "友田瞬", "友田凪", "大野龍人", "大野嵩仁", "大野義博", "根来久美子", "武富慶子", "武富瑠音", "武富歓奈", "大原清二", "松山幸一", "中谷哲也"],
  },
  kanagawa: {
    ritsumei: ["大西実", "柳澤政智", "風間謙一", "道城一隆", "小野忍", "小野富雄", "小野正博", "柏木和重", "伊藤ナオミ", "木村敬子", "小野博子", "岩瀬弘子", "岸井秋子", "風間千穂", "大垣壽子", "安田朋子", "野澤博子", "岡崎千帆", "柏木マリエ", "鎌田有希子", "北島智代", "北島裕子", "北島陽子", "岡村正子", "西元美穂", "西元愛翔"],
    kuyo: [],
  },
  fujisan: {
    ritsumei: ["太田敏男", "石原因", "三上ますみ", "佐野時子", "松田静香"],
    kuyo: ["佐野忠男", "佐野裕俊", "佐野幸祐", "佐野十五六", "佐野日向", "佐野立", "石原恒太郎", "大谷裕也", "三上祐輔", "三上真睦", "石原司歩子", "大谷稚和子", "三上美幸", "佐野智登世", "佐野実穂", "佐野そら", "佐野小花", "太田小百合", "井上豊子", "望月栄子", "前田里美", "大谷心乃", "大谷音乃", "石原未莉", "松田芳晴", "松田稲子", "松田雄亮", "三上一", "三上智成", "三上由美子", "三上大知", "三上結菜"],
  },
  sunten: {
    ritsumei: ["伏見ます美", "外村和代", "山本さち子", "新井文美", "鈴木美帆", "鈴木雅和", "新間紗織", "杉山多香子"],
    kuyo: ["村松かず子", "加藤恵子", "山本敏夫", "鈴木星名", "鈴木美心人", "鈴木ひより", "鈴木忍", "鈴木菊江", "福澤菜穂子", "武井啓次", "武井由香里", "武井万祐子", "武井雅斗"],
  },
  saitama: {
    ritsumei: ["小川克枝", "小泉朱美", "酒巻保江", "冨永千栄子", "中村勝利", "原田直子", "木津邦雄", "木津志優", "飯山雄二", "飯山佳子", "小田嶋陽子", "上原美雪", "山口一雄", "榎本徳子", "西野志穂", "坂尻博昭", "岡野寿美子", "岡野紀久子"],
    kuyo: ["木津伊美子", "木津俊信", "木津洋三", "木津妙子", "木津思音", "相田八重子", "高柳麻理子", "田邊貴章", "須黒安子", "清水みさほ", "堀越文子", "上原正樹", "上原広樹", "仲間まゆみ", "福田里菜", "福田優", "Alec純Blum", "小田嶋基就", "田中良実", "田中誠", "田中陽斗", "中村光子", "金城邦枝", "西野玲奈", "石川大輔", "相原久子", "山田幸世", "山田智", "山田裕生", "榎本圭吾", "矢代初枝", "矢代吉榮", "矢代順子", "矢代海斗"],
  },
  chiba: {
    ritsumei: ["阿部和浩", "上原悟", "池田晴子", "落合恵美", "三好和代", "大越隆郎", "加藤千景", "山本千鶴子", "仲野健一", "芳賀順子", "古田美由紀", "赤松史悦", "佐野円", "渡辺美里", "石井洋子", "羽田陽美", "芝崎珠恵", "林ゆう子", "永瀬真由美", "加藤裕美子", "中村美鈴", "小山公成", "山形寿代", "那波祐子", "高橋篤男", "西山史生", "武田亜美", "武田康裕", "寺本光良", "寺本千華", "福住真季", "橋本幸一", "渡邊佳織", "後藤義子", "伊藤正夫", "小島みづほ", "中村寿美雄", "遠藤光代", "中川博恵", "柳澤みどり", "齊藤和子", "渡邊文子", "渡邊颯太", "渡邊欣", "仲野春霞", "仲野頼妙", "仲野和代", "仲野博文", "加藤順一", "原有里", "笠間歩", "小山晃子", "佐藤みどり", "馬場彩香", "鈴木真喜", "千本木ゆかり", "羽鳥綾香", "中島綾希代"],
    kuyo: ["田中康晴", "田中照子", "田中ソノ子", "加藤あいこ", "加藤明日香", "池田輝彦", "池田順子", "池田恵美子", "中野邦江", "中間寿恵", "尾股朝治", "後藤秀太朗", "後藤夏海", "高岸実", "木原康夫", "川合はるか", "外薗潤", "寺口祐輔", "寺口真夏", "武田ふみ子", "上川美朝子", "吉川孝子", "島垣智子"],
  },
  yamanashi: {
    ritsumei: ["細田倫宏", "田辺利幸", "松本良喜", "柳本悠馬", "米倉弦希", "柳本睦美", "細田ゆう子", "尾ノ上裕美", "田辺惠子", "中島知里", "佐野よう子", "宮下よし子", "宮川康子", "宮川エブリン", "米倉三穂", "堀之内敬一", "渡辺和美"],
    kuyo: ["小椋裕美子", "小椋大地", "尾ノ上卓朗", "尾ノ上楓雅", "尾ノ上結良", "南湖ゆかり", "米倉健一", "米倉廉人", "川手真紀", "深作亜紀子", "白井知子", "白井里美"],
  },
};

const storeKey = "myouou-shinkokuryutai-allocation-v1";
const state = loadState();
let currentHall = null;
let openHallId = null;
let detailFilters = {};
let listHallId = "yamanashi";
let listMode = "history";
let historyImportInFlight = false;
let inlineListHallId = null;

function loadState() {
  const saved = localStorage.getItem(storeKey);
  if (saved) {
    const parsed = JSON.parse(saved);
    CEREMONIES.forEach(([id, name, date]) => {
      if (!parsed.ceremonies[id]) parsed.ceremonies[id] = makeCeremony(id, name, date);
      parsed.ceremonies[id].name = name;
    });
    if (!CEREMONIES.some(([id]) => id === parsed.currentCeremony)) parsed.currentCeremony = "segaki";
    return parsed;
  }
  const ceremonies = Object.fromEntries(CEREMONIES.map(([id, name, date]) => [id, {
    ...makeCeremony(id, name, date),
  }]));
  return { currentCeremony: "segaki", currentYear: "2026", ceremonies };
}

function makeCeremony(id, name, date) {
  return {
    id,
    name,
    date,
    deadline: internalDeadline(date),
    snapshotAt: "",
    halls: makeInitialHalls(id),
  };
}

function makeInitialHalls(ceremonyId) {
  return Object.fromEntries(HALLS.map(([id]) => {
    const preset = ceremonyId === "segaki" ? PRESET_NAMES[id] : null;
    return [id, {
      mode: "auto",
      ritsumei: preset?.ritsumei || [],
      kuyo: preset?.kuyo || [],
      inactive: [],
      delivered: {},
      manualNumbers: {},
      updatedAt: ceremonyId === "segaki" ? "2026-08-04T18:25" : "",
    }];
  }));
}

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify(state));
}

function internalDeadline(date) {
  const d = new Date(`${date}T12:00:00`);
  d.setDate(d.getDate() - 3);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T12:00`;
}

function normalizeLines(text) {
  return text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function ceremony() {
  return state.ceremonies[state.currentCeremony];
}

function previousCeremony() {
  const index = CEREMONIES.findIndex(([id]) => id === state.currentCeremony);
  if (index <= 0) return null;
  return state.ceremonies[CEREMONIES[index - 1][0]];
}

function setup() {
  const yearSelect = document.querySelector("#yearSelect");
  ["2026", "2027", "2028"].forEach((year) => yearSelect.add(new Option(year, year)));
  yearSelect.value = state.currentYear;
  yearSelect.addEventListener("change", () => {
    state.currentYear = yearSelect.value;
    saveState();
  });

  const ceremonySelect = document.querySelector("#ceremonySelect");
  CEREMONIES.forEach(([id, name]) => ceremonySelect.add(new Option(name, id)));
  ceremonySelect.value = state.currentCeremony;
  ceremonySelect.addEventListener("change", () => {
    state.currentCeremony = ceremonySelect.value;
    saveState();
    render();
  });

  document.querySelector("#deadlineInput").addEventListener("change", (event) => {
    ceremony().deadline = event.target.value;
    saveState();
    render();
  });

  document.querySelector("#snapshotButton").addEventListener("click", () => {
    ceremony().snapshotAt = new Date().toISOString();
    saveState();
    render();
  });

  document.querySelector("#printButton").addEventListener("click", printCurrentView);
  document.querySelector("#pdfButton").addEventListener("click", printCurrentView);
  window.addEventListener("afterprint", () => document.body.classList.remove("printing-detail"));
  document.querySelector("#advancedImportButton").addEventListener("click", importFromAdvanced);
  document.querySelector("#saveNamesButton").addEventListener("click", saveDialogNames);
  render();
}

function historyNeedsImport() {
  return CEREMONIES.some(([id]) => !state.ceremonies[id].halls[listHallId].updatedAt);
}

function setListMode(mode) {
  listMode = mode;
  const card = document.querySelector(`.hall-card[data-hall-id="${inlineListHallId}"]`);
  if (card) renderInlineList(card, inlineListHallId);
}

function printCurrentView() {
  document.body.classList.toggle("printing-detail", Boolean(openHallId));
  requestAnimationFrame(() => window.print());
}

async function importFromAdvanced() {
  const status = document.querySelector("#advancedImportStatus");
  status.textContent = "取得中...";
  try {
    const res = await fetch("/api/import-advanced", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: state.currentYear,
        ceremonyName: ceremony().name,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "取得できませんでした。");

    const current = ceremony();
    if (data.ceremony?.date) current.date = data.ceremony.date;
    if (data.ceremony?.deadline) current.deadline = `${data.ceremony.deadline}T12:00`;
    HALLS.forEach(([hallId]) => {
      const imported = data.halls?.[hallId];
      if (!imported) return;
      current.halls[hallId].ritsumei = imported.ritsumei || [];
      current.halls[hallId].kuyo = imported.kuyo || [];
      current.halls[hallId].updatedAt = data.fetchedAt || new Date().toISOString();
    });
    saveState();
    render();
    status.textContent = "取得しました。";
  } catch (error) {
    status.textContent = error.message;
  }
}

async function importHistoryFromAdvanced() {
  if (historyImportInFlight) return;
  historyImportInFlight = true;
  const status = document.querySelector("#advancedImportStatus");
  status.textContent = "履歴を取得中...";
  try {
    const res = await fetch("/api/import-advanced", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year: state.currentYear, history: true }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "履歴を取得できませんでした。");

    data.ceremonies.forEach((imported) => {
      const current = state.ceremonies[imported.key];
      if (!current) return;
      current.date = imported.date;
      current.deadline = `${imported.deadline}T12:00`;
      HALLS.forEach(([hallId]) => {
        const hall = imported.halls?.[hallId];
        if (!hall) return;
        current.halls[hallId].ritsumei = hall.ritsumei || [];
        current.halls[hallId].kuyo = hall.kuyo || [];
        current.halls[hallId].updatedAt = data.fetchedAt || new Date().toISOString();
      });
    });
    saveState();
    render();
    status.textContent = `${data.ceremonies.length}件を取得しました。`;
  } catch (error) {
    status.textContent = error.message;
  } finally {
    historyImportInFlight = false;
  }
}

function rowsForHall(hallId) {
  const current = ceremony().halls[hallId];
  const previous = previousCeremony()?.halls[hallId];
  const rows = [];
  addRows(rows, "ritsumei", current.ritsumei, previous?.ritsumei || []);
  addRows(rows, "kuyo", current.kuyo, previous?.kuyo || []);
  return rows;
}

function addRows(rows, type, currentNames, previousNames) {
  const currentSet = new Set(currentNames);
  const previousSet = new Set(previousNames);
  const merged = [];
  previousNames.forEach((name) => merged.push(name));
  currentNames.forEach((name) => {
    if (!previousSet.has(name)) merged.push(name);
  });
  merged.forEach((name, index) => {
    rows.push({
      type,
      name,
      key: `${type}:${index}:${name}`,
      active: currentSet.has(name),
      isNew: currentSet.has(name) && previousNames.length > 0 && !previousSet.has(name),
    });
  });
}

function eligibleRows(hallId) {
  return rowsForHall(hallId).filter((row) => row.active);
}

function allocation() {
  let next = 1;
  return Object.fromEntries(HALLS.map(([hallId]) => {
    const count = eligibleRows(hallId).length;
    const start = count ? next : null;
    const end = count ? next + count - 1 : null;
    next += count;
    return [hallId, { start, end, count }];
  }));
}

function numberForRow(hallId, row, activeIndex, ranges) {
  const hall = ceremony().halls[hallId];
  if (!row.active) return "";
  if (hall.mode === "manual" && hall.manualNumbers[row.key]) return hall.manualNumbers[row.key];
  return ranges[hallId].start + activeIndex;
}

function numberForName(ceremonyId, hallId, type, name) {
  const selected = state.ceremonies[ceremonyId];
  const hall = selected.halls[hallId];
  const names = hall[type];
  const index = names.indexOf(name);
  if (index < 0) return "";
  const key = `${type}:${index}:${name}`;
  if (hall.mode === "manual" && hall.manualNumbers[key]) return hall.manualNumbers[key];
  const previousCount = HALLS.slice(0, HALLS.findIndex(([id]) => id === hallId))
    .reduce((total, [id]) => total + selected.halls[id].ritsumei.length + selected.halls[id].kuyo.length, 0);
  return previousCount + (type === "ritsumei" ? index : hall.ritsumei.length + index) + 1;
}

function deliveryForName(ceremonyId, hallId, type, name) {
  const hall = state.ceremonies[ceremonyId].halls[hallId];
  const index = hall[type].indexOf(name);
  return index < 0 ? false : Boolean(hall.delivered[`${type}:${index}:${name}`]);
}

function listRows(hallId, ceremonyIds) {
  const names = [];
  const seen = new Set();
  const preferred = ceremony().halls[hallId];
  [preferred.ritsumei, preferred.kuyo].flat().forEach((name) => {
    if (!seen.has(name)) { seen.add(name); names.push(name); }
  });
  ceremonyIds.forEach((id) => {
    const hall = state.ceremonies[id].halls[hallId];
    [hall.ritsumei, hall.kuyo].flat().forEach((name) => {
      if (!seen.has(name)) { seen.add(name); names.push(name); }
    });
  });
  return names;
}

function renderInlineList(card, hallId) {
  listHallId = hallId;
  inlineListHallId = hallId;
  const content = card.querySelector(".inline-list");
  const people = card.querySelector(".people");
  const ids = listMode === "single" ? [state.currentCeremony] : CEREMONIES.map(([id]) => id);
  const rows = listRows(listHallId, ids);
  const hallName = HALLS.find(([id]) => id === listHallId)[1];
  const columns = ids.map((id) => state.ceremonies[id]);
  people.hidden = true;
  content.hidden = false;
  content.innerHTML = `
    <div class="list-toolbar">
      <div class="list-mode" aria-label="表示方法">
        <button class="button secondary list-single ${listMode === "single" ? "is-selected" : ""}" type="button">この護摩供</button>
        <button class="button secondary list-history ${listMode === "history" ? "is-selected" : ""}" type="button">履歴</button>
      </div>
    </div>
    <div class="list-heading">
      <h2>${escapeHtml(hallName)}</h2>
      <span>${listMode === "single" ? escapeHtml(ceremony().name) : "第14回泉珠収天護摩供から最新まで"}</span>
    </div>
    <div class="list-scroll">
      <table class="participant-list">
        <thead><tr><th>順</th><th>氏名</th>${columns.map((item) => `<th>${escapeHtml(shortCeremonyName(item.name))}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((name, index) => `<tr><td>${index + 1}</td><th scope="row">${escapeHtml(name)}</th>${columns.map((item) => listCell(item, name)).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
  content.querySelector(".list-single").addEventListener("click", () => setListMode("single"));
  content.querySelector(".list-history").addEventListener("click", () => setListMode("history"));
  card.querySelector(".open-list").textContent = "名簿";
}

function hideInlineList(card) {
  card.querySelector(".inline-list").hidden = true;
  card.querySelector(".people").hidden = false;
  card.querySelector(".open-list").textContent = "一覧";
  inlineListHallId = null;
}

function listCell(item, name) {
  const hall = item.halls[listHallId];
  if (!hall.updatedAt) return '<td class="list-cell unavailable">—</td>';
  const type = hall.ritsumei.includes(name) ? "ritsumei" : hall.kuyo.includes(name) ? "kuyo" : "";
  if (!type) return '<td class="list-cell absent">不参加</td>';
  const number = numberForName(item.id, listHallId, type, name);
  const delivered = deliveryForName(item.id, listHallId, type, name);
  return `<td class="list-cell ${type}"><strong>${escapeHtml(String(number))}</strong><span>${delivered ? "✓" : ""}</span></td>`;
}

function shortCeremonyName(name) {
  return name.replace(/^第\d+回/, "").replace(/護摩供$/, "").replace(/大環天$/, "");
}

function render() {
  const c = ceremony();
  const ranges = allocation();
  document.querySelector("#ceremonySelect").value = state.currentCeremony;
  document.querySelector("#deadlineInput").value = c.deadline;
  document.querySelector("#ceremonyTitle").textContent = `${c.name}（${c.date}）`;
  document.querySelector("#ceremonyMeta").textContent = `聖明王院〆切: ${formatDateTime(c.deadline)}`;
  document.querySelector("#snapshotStatus").textContent = c.snapshotAt ? `固定済 ${formatDateTime(c.snapshotAt)}` : "下書き";

  let totalRitsumei = 0;
  let totalKuyo = 0;
  let totalNew = 0;
  HALLS.forEach(([hallId]) => {
    const rows = rowsForHall(hallId).filter((row) => row.active);
    totalRitsumei += rows.filter((row) => row.type === "ritsumei").length;
    totalKuyo += rows.filter((row) => row.type === "kuyo").length;
    totalNew += rows.filter((row) => row.isNew).length;
  });

  document.querySelector("#totalEligible").textContent = totalRitsumei + totalKuyo;
  document.querySelector("#totalRitsumei").textContent = totalRitsumei;
  document.querySelector("#totalKuyo").textContent = totalKuyo;
  document.querySelector("#totalNew").textContent = totalNew;

  const cards = document.querySelector("#cards");
  cards.innerHTML = "";
  HALLS.forEach(([hallId, hallName, managerName]) => {
    cards.appendChild(renderHallCard(hallId, hallName, managerName, ranges));
  });
}

function renderHallCard(hallId, hallName, managerName, ranges) {
  const template = document.querySelector("#cardTemplate");
  const node = template.content.firstElementChild.cloneNode(true);
  node.dataset.hallId = hallId;
  const hall = ceremony().halls[hallId];
  const rows = rowsForHall(hallId);
  const activeRows = rows.filter((row) => row.active);
  const inactiveCount = rows.length - activeRows.length;
  const ritsumeiCount = activeRows.filter((row) => row.type === "ritsumei").length;
  const kuyoCount = activeRows.filter((row) => row.type === "kuyo").length;
  const newCount = activeRows.filter((row) => row.isNew).length;
  const range = ranges[hallId];

  node.querySelector(".hall-name").textContent = hallName;
  node.querySelector(".manager-name").textContent = `担当者: ${managerName}`;
  node.querySelector(".range").textContent = range.count ? `${range.start}〜${range.end}` : "—";
  node.querySelector(".card-stats").innerHTML = [
    ["合計", activeRows.length],
    ["立命行", ritsumeiCount],
    ["供養会", kuyoCount],
    ["新規", newCount],
    ["不参加", inactiveCount],
  ].map(([label, value]) => `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`).join("");

  const detail = node.querySelector(".card-detail");
  detail.dataset.printTitle = `${hallName} ${range.count ? `${range.start}〜${range.end}` : "—"}`;
  if (openHallId === hallId) {
    node.classList.add("is-open");
    detail.hidden = false;
    renderPeople(node, hallId, ranges, detailFilters[hallId] || "all");
    if (inlineListHallId === hallId) renderInlineList(node, hallId);
  }
  node.querySelector(".card-top").addEventListener("click", () => {
    detail.hidden = !detail.hidden;
    openHallId = detail.hidden ? null : hallId;
    if (detail.hidden && inlineListHallId === hallId) inlineListHallId = null;
    node.classList.toggle("is-open", !detail.hidden);
    if (!detail.hidden) renderPeople(node, hallId, ranges, detailFilters[hallId] || "all");
  });
  node.querySelector(".edit-names").addEventListener("click", () => openEditDialog(hallId));
  node.querySelector(".open-list").addEventListener("click", () => {
    if (inlineListHallId === hallId) {
      hideInlineList(node);
      return;
    }
    renderInlineList(node, hallId);
    if (listMode === "history" && historyNeedsImport()) importHistoryFromAdvanced();
  });
  node.querySelector(".auto-number").addEventListener("click", () => {
    hall.mode = "auto";
    saveState();
    render();
  });
  node.querySelector(".manual-number").addEventListener("click", () => {
    hall.mode = "manual";
    saveState();
    renderPeople(node, hallId, ranges, "all");
  });
  node.querySelector(".show-undelivered").addEventListener("click", () => renderPeople(node, hallId, ranges, "undelivered"));
  node.querySelector(".show-all").addEventListener("click", () => renderPeople(node, hallId, ranges, "all"));
  node.querySelector(".close-detail").addEventListener("click", () => {
    detail.hidden = true;
    openHallId = null;
    inlineListHallId = null;
    node.classList.remove("is-open");
  });

  return node;
}

function renderPeople(card, hallId, ranges, filter) {
  detailFilters[hallId] = filter;
  const people = card.querySelector(".people");
  const hall = ceremony().halls[hallId];
  const rows = rowsForHall(hallId);
  people.innerHTML = "";
  let activeIndex = 0;
  ["ritsumei", "kuyo"].forEach((type) => {
    const typeRows = rows.filter((row) => row.type === type);
    const activeTypeRows = typeRows.filter((row) => row.active);
    const title = document.createElement("div");
    title.className = `section-title ${type}`;
    title.innerHTML = `<span>${type === "ritsumei" ? "立命行" : "供養会"}</span><span>${activeTypeRows.length}名</span>`;
    people.appendChild(title);
    typeRows.forEach((row, index) => {
      const thisActiveIndex = row.active ? activeIndex++ : null;
      if (filter === "undelivered" && (!row.active || hall.delivered[row.key])) return;
      const number = row.active ? numberForRow(hallId, row, thisActiveIndex, ranges) : "";
      const rowNode = document.createElement("div");
      rowNode.className = `person-row ${type}${row.active ? "" : " inactive"}`;
      rowNode.innerHTML = `
        <div class="row-index">${index + 1}</div>
        <div class="person-name"><span>${escapeHtml(row.name)}</span>${row.isNew ? '<span class="badge-new">新</span>' : ""}</div>
        <div class="number-slot"></div>
        <div class="deliver"></div>
      `;
      const numberSlot = rowNode.querySelector(".number-slot");
      if (!row.active) {
        numberSlot.className = "number-view";
        numberSlot.textContent = "—";
      } else if (hall.mode === "manual") {
        const input = document.createElement("input");
        input.className = "number-input";
        input.inputMode = "numeric";
        input.value = number;
        input.addEventListener("change", () => {
          hall.manualNumbers[row.key] = input.value.trim();
          saveState();
        });
        numberSlot.appendChild(input);
      } else {
        numberSlot.className = "number-view";
        numberSlot.textContent = number;
      }
      if (row.active) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Boolean(hall.delivered[row.key]);
        checkbox.setAttribute("aria-label", `${row.name} 個人配布`);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            hall.delivered[row.key] = { checkedAt: new Date().toISOString(), deliveredDate: "" };
          } else {
            delete hall.delivered[row.key];
          }
          saveState();
          render();
        });
        rowNode.querySelector(".deliver").appendChild(checkbox);
      }
      people.appendChild(rowNode);
    });
  });
}

function openEditDialog(hallId) {
  currentHall = hallId;
  const hall = ceremony().halls[hallId];
  const info = HALLS.find(([id]) => id === hallId);
  document.querySelector("#dialogTitle").textContent = `${info[1]} 名簿編集`;
  document.querySelector("#ritsumeiText").value = hall.ritsumei.join("\n");
  document.querySelector("#kuyoText").value = hall.kuyo.join("\n");
  document.querySelector("#editDialog").showModal();
}

function saveDialogNames() {
  const hall = ceremony().halls[currentHall];
  hall.ritsumei = normalizeLines(document.querySelector("#ritsumeiText").value);
  hall.kuyo = normalizeLines(document.querySelector("#kuyoText").value);
  hall.updatedAt = new Date().toISOString();
  saveState();
  document.querySelector("#editDialog").close();
  render();
}

function formatDateTime(value) {
  if (!value) return "未設定";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

setup();
