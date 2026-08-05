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
  ["senju", "第14回泉珠収天護摩供", "2026-01-01", "14収天"],
  ["chiku", "第24回大元地空護摩供", "2026-01-01", "地空"],
  ["kaikou", "第26回界光宇炎護摩供", "2026-01-01", "界光"],
  ["myou", "第31回八大明王護摩供", "2026-01-01", "明王"],
  ["jizou", "第30回地蔵尊王護摩供", "2026-01-01", "地蔵"],
  ["ryuge", "第13回龍華大圓護摩供（陽）", "2026-01-01", "龍華"],
  ["segaki", "第30回施餓鬼供養護摩供", "2026-08-09", "施餓鬼"],
  ["chimei", "第17回治命普済護摩供", "2026-08-16", "治命"],
  ["gyokuji", "第24回玉璽大環天護摩供", "2026-08-30", "玉璽"],
  ["hokuto", "北斗鎮圧護摩供", "2026-01-01", "北鎮"],
  ["rokuson", "禄存宝珠護摩供", "2026-01-01", "宝珠"],
  ["kokufu", "国父の日", "2026-01-01", "国父の日"],
  ["chosei", "長生南十字星護摩供", "2026-01-01", "南十字"],
  ["myozen", "妙善閻魔天王護摩供", "2026-01-01", "閻魔"],
  ["shuten", "収天大龍華祭", "2026-01-01", "大龍華祭"],
  ["chinkon", "鎮魂四海龍王護摩供", "2026-01-01", "鎮魂"],
  ["senju15", "第15回泉珠収天護摩供", "2026-01-01", "15収天"],
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
    ritsumei: ["大西実", "柳澤政智", "風間謙一", "道城一隆", "小野忍", "小野富雄", "小野正博", "柏木和重", "伊藤ナオミ", "木村敬子", "小野博子", "岩瀬弘子", "岸井秋子", "風間千穂", "大垣壽子", "安田朋子", "野澤博子", "岡崎千帆", "柏木マリヱ", "鎌田有希子", "北島智代", "北島裕子", "北島陽子", "岡村正子", "西元美穂", "西元愛翔"],
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
const PARTICIPANT_NAME_CORRECTIONS = {
  石破福子: "石橋　福子", 石橋福子: "石橋　福子",
  今田ミサ子: "今田　ミサ子", 守屋正裕: "守屋　正裕", 村上勝: "村上　勝", 岡本千穂: "岡本　千穂",
  髙濱仁美: "髙濱　仁美", 高濱仁美: "髙濱　仁美", 天野公子: "天野　公子", 新野惠里乃: "新野　惠里乃", 新野恵里乃: "新野　惠里乃",
  中野寿恵: "中野　寿恵", 高木詔治: "高木　詔治", 高木詔二: "高木　詔治", 齋藤久子: "齋藤　久子",
  梅澤碧: "梅澤　碧", 根本武: "根本　武", 樫村有: "樫村　有", 友田光: "友田　光", 友田空: "友田　空", 友田瞬: "友田　瞬", 友田凪: "友田　凪",
  石黑貴子: "石黑貴子", 石黒貴子: "石黑貴子", 石黑健司: "石黑健司", 石黒健司: "石黑健司", 石黑基以: "石黑基以", 石黒基以: "石黑基以", 石黑百果: "石黑百果", 石黒百果: "石黑百果", 石黑康平: "石黑康平", 石黒康平: "石黑康平",
  海老原泰大: "海老原泰大", 海老原泰太: "海老原泰大", 田口加容子: "田口加容子", 田口加奈子: "田口加容子", 樺山和晃: "樺山和晃", 権山和晃: "樺山和晃", 樺山舞: "樺山舞", 権山舞: "樺山舞", 根來久美子: "根來久美子", 根来久美子: "根來久美子", 大原清一: "大原清一", 大原清二: "大原清一",
  新間紗織: "新間紗織", 新間沙織: "新間紗織",
  高栁麻理子: "高栁麻理子", 高柳麻理子: "高栁麻理子", 髙栁麻理子: "高栁麻理子", 田中良実: "田中良実", 田中良美: "田中良実",
  上原悟: "上原　悟", 佐野円: "佐野　円", 渡邊欣: "渡邊　欣", 栁澤みどり: "栁澤みどり", 柳澤みどり: "栁澤みどり", 鈴木眞喜: "鈴木眞喜", 鈴木真喜: "鈴木眞喜", 高橋範男: "高橋範男", 高橋篤男: "高橋範男", 齊藤知子: "齊藤知子", 齊藤和子: "齊藤知子", 仲野頼紗: "仲野頼紗", 仲野頼妙: "仲野頼紗",
  柏木マリヱ: "柏木マリヱ", 柏木マリエ: "柏木マリヱ", "岡﨑千帆": "岡崎千帆", 岡崎千帆: "岡崎千帆",
};
const state = loadState();
let currentHall = null;
let openHallId = null;
let detailFilters = {};
let listHallId = "yamanashi";
let historyImportInFlight = false;
let inlineListHallId = null;
let globalNewOpen = false;
let cloudReady = false;
let cloudSaveTimer = null;
let changedBeforeCloudLoad = false;

function loadState() {
  const saved = localStorage.getItem(storeKey);
  if (saved) {
    return normalizeState(JSON.parse(saved));
  }
  const ceremonies = Object.fromEntries(CEREMONIES.map(([id, name, date]) => [id, {
    ...makeCeremony(id, name, date),
  }]));
  return normalizeState({ currentCeremony: "segaki", currentYear: "2026", ceremonies, historyFetchedAt: "" });
}

function normalizeState(parsed) {
  parsed.ceremonies ||= {};
  CEREMONIES.forEach(([id, name, date]) => {
    if (!parsed.ceremonies[id]) parsed.ceremonies[id] = makeCeremony(id, name, date);
    parsed.ceremonies[id].name = name;
  });
  correctSavedNames(parsed);
  if (!CEREMONIES.some(([id]) => id === parsed.currentCeremony)) parsed.currentCeremony = "segaki";
  parsed.currentYear ||= "2026";
  parsed.historyFetchedAt ||= "";
  return parsed;
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
  if (!cloudReady) {
    changedBeforeCloudLoad = true;
    return;
  }
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(saveSharedState, 500);
}

async function loadSharedState() {
  try {
    const response = await fetch("/api/state");
    if (!response.ok) throw new Error("共有データを読み込めませんでした。");
    const shared = await response.json();
    cloudReady = true;
    if (shared.state && !changedBeforeCloudLoad) {
      const normalized = normalizeState(shared.state);
      Object.keys(state).forEach((key) => delete state[key]);
      Object.assign(state, normalized);
      localStorage.setItem(storeKey, JSON.stringify(state));
      render();
      return;
    }
    saveSharedState();
  } catch (error) {
    cloudReady = false;
  }
}

async function saveSharedState() {
  try {
    await fetch("/api/state", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    });
  } catch (error) {
    cloudReady = false;
  }
}

function internalDeadline(date) {
  const d = new Date(`${date}T12:00:00`);
  d.setDate(d.getDate() - 3);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T12:00`;
}

function normalizeLines(text) {
  return text.split(/\r?\n/).map((line) => correctParticipantName(line.trim())).filter(Boolean);
}

function correctParticipantName(name) {
  const compactName = name.replace(/[ 　]/g, "");
  return (PARTICIPANT_NAME_CORRECTIONS[compactName] || compactName).replace(/[ 　]/g, "");
}

function correctSavedNames(savedState) {
  Object.values(savedState.ceremonies).forEach((ceremonyData) => {
    Object.values(ceremonyData.halls).forEach((hall) => {
      ["ritsumei", "kuyo"].forEach((type) => {
        const originalNames = hall[type];
        const correctedNames = [];
        originalNames.forEach((originalName, originalIndex) => {
          const correctedName = correctParticipantName(originalName);
          let correctedIndex = correctedNames.indexOf(correctedName);
          if (correctedIndex < 0) {
            correctedIndex = correctedNames.length;
            correctedNames.push(correctedName);
          }
          remapPersonKey(hall.delivered, type, originalIndex, originalName, correctedIndex, correctedName);
          remapPersonKey(hall.manualNumbers, type, originalIndex, originalName, correctedIndex, correctedName);
        });
        hall[type] = correctedNames;
      });
    });
  });
}

function remapPersonKey(record, type, oldIndex, oldName, newIndex, newName) {
  const oldKey = `${type}:${oldIndex}:${oldName}`;
  const newKey = `${type}:${newIndex}:${newName}`;
  if (oldKey !== newKey && record[oldKey] && !record[newKey]) record[newKey] = record[oldKey];
  if (oldKey !== newKey) delete record[oldKey];
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
    ceremony().snapshotAt = ceremony().snapshotAt ? "" : new Date().toISOString();
    saveState();
    render();
  });

  document.querySelector("#printButton").addEventListener("click", printCurrentView);
  document.querySelector("#globalNewButton").addEventListener("click", () => {
    globalNewOpen = document.querySelector("#globalNewList").hidden;
    renderGlobalNewList();
  });
  document.querySelector("#globalNewList").addEventListener("click", () => {
    globalNewOpen = false;
    renderGlobalNewList();
  });
  window.addEventListener("afterprint", () => document.body.classList.remove("printing-detail"));
  document.querySelector("#advancedImportButton").addEventListener("click", importFromAdvanced);
  document.querySelector("#saveNamesButton").addEventListener("click", saveDialogNames);
  render();
  loadSharedState();
}

function historyNeedsImport() {
  return !state.historyFetchedAt;
}

function printCurrentView() {
  document.body.classList.toggle("printing-detail", Boolean(openHallId));
  requestAnimationFrame(() => window.print());
}

async function downloadListPdf(event) {
  if (!inlineListHallId) {
    window.alert("一覧を表示してからPDF保存を押してください。");
    return;
  }
  if (!window.html2canvas || !window.jspdf?.jsPDF) {
    window.alert("PDF作成の準備ができませんでした。もう一度お試しください。");
    return;
  }

  const card = document.querySelector(`.hall-card[data-hall-id="${inlineListHallId}"]`);
  const table = card?.querySelector(".participant-list");
  if (!table) return;

  const hallName = HALLS.find(([id]) => id === inlineListHallId)[1];
  const period = "第14回泉珠収天護摩供から最新まで";
  const button = event.currentTarget;
  const originalButtonText = button.textContent;

  button.disabled = true;
  button.textContent = "PDF作成中...";
  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 8;
    const contentWidth = pageWidth - margin * 2;
    const rows = [...table.tBodies[0].rows];
    const dataColumnCount = table.tHead.rows[0].cells.length - 2;
    const columnsPerPage = 4;
    const rowsPerPage = 15;
    let page = 0;

    for (let columnStart = 0; columnStart < dataColumnCount; columnStart += columnsPerPage) {
      for (let rowStart = 0; rowStart < rows.length; rowStart += rowsPerPage) {
        const source = createPdfPageSource(
          table,
          hallName,
          period,
          columnStart,
          columnsPerPage,
          rowStart,
          rowsPerPage,
        );
        document.body.appendChild(source);
        const canvas = await window.html2canvas(source, {
          backgroundColor: "#ffffff",
          scale: 1,
          useCORS: true,
          windowWidth: source.scrollWidth,
          windowHeight: source.scrollHeight,
          onclone: (clonedDocument) => {
            const clonedSource = clonedDocument.querySelector(".pdf-export-source");
            clonedDocument.body.replaceChildren(clonedSource);
            clonedSource.style.position = "static";
            clonedSource.style.left = "0";
          },
        });
        source.remove();
        if (page) pdf.addPage("a4", "portrait");
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", margin, margin, contentWidth, canvas.height * contentWidth / canvas.width);
        page += 1;
      }
    }
    pdf.save(`allocation-${inlineListHallId}-${ceremony().id}.pdf`);
  } catch (error) {
    console.error("PDF export failed", error);
    window.alert("PDFを作成できませんでした。もう一度お試しください。");
  } finally {
    button.disabled = false;
    button.textContent = originalButtonText;
  }
}

function createPdfPageSource(table, hallName, period, columnStart, columnsPerPage, rowStart, rowsPerPage) {
  const source = document.createElement("section");
  source.className = "pdf-export-source";
  source.innerHTML = `<h1>${escapeHtml(hallName)}</h1><p>${escapeHtml(period)}</p>`;
  const pageTable = document.createElement("table");
  pageTable.className = "participant-list";
  const copyRow = (row) => {
    const copied = document.createElement("tr");
    [...row.cells].forEach((cell, index) => {
      if (index >= 2 && (index < columnStart + 2 || index >= columnStart + 2 + columnsPerPage)) return;
      copied.appendChild(cell.cloneNode(true));
    });
    return copied;
  };
  const head = document.createElement("thead");
  [...table.tHead.rows].forEach((row) => head.appendChild(copyRow(row)));
  const body = document.createElement("tbody");
  [...table.tBodies[0].rows].slice(rowStart, rowStart + rowsPerPage).forEach((row) => body.appendChild(copyRow(row)));
  pageTable.append(head, body);
  source.appendChild(pageTable);
  return source;
}

async function importFromAdvanced() {
  const status = document.querySelector("#advancedImportStatus");
  if (ceremony().snapshotAt) {
    status.textContent = "固定を解除してから取得してください。";
    return;
  }
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
    state.historyFetchedAt = data.fetchedAt || new Date().toISOString();
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
  const ceremonyIndex = CEREMONIES.findIndex(([id]) => id === state.currentCeremony);
  const pastCeremonies = CEREMONIES.slice(0, ceremonyIndex).map(([id]) => state.ceremonies[id]);
  const rows = [];
  addRows(rows, "ritsumei", current.ritsumei, previous?.ritsumei || [], pastCeremonies, hallId);
  addRows(rows, "kuyo", current.kuyo, previous?.kuyo || [], pastCeremonies, hallId);
  return rows;
}

function addRows(rows, type, currentNames, previousNames, pastCeremonies, hallId) {
  const currentSet = new Set(currentNames);
  const previousSet = new Set(previousNames);
  const hasPastData = pastCeremonies.some((item) => item.halls[hallId]?.updatedAt);
  const pastNames = new Set(pastCeremonies.flatMap((item) => {
    const hall = item.halls[hallId];
    return hall?.updatedAt ? [...hall.ritsumei, ...hall.kuyo] : [];
  }));
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
      isNew: currentSet.has(name) && hasPastData && !pastNames.has(name),
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
  const ids = CEREMONIES.map(([id]) => id);
  const rows = listRows(listHallId, ids);
  const hallName = HALLS.find(([id]) => id === listHallId)[1];
  const columns = ids.map((id) => state.ceremonies[id]);
  people.hidden = true;
  content.hidden = false;
  content.innerHTML = `
    <div class="list-toolbar">
      <span class="list-label">履歴</span>
      <button class="button primary download-list-pdf" type="button">PDF保存</button>
      <button class="button secondary close-list" type="button">閉じる</button>
    </div>
    <div class="list-heading list-close-area" role="button" tabindex="0" aria-label="名簿に戻る">
      <h2>${escapeHtml(hallName)}</h2>
      <span>第14回泉珠収天護摩供から最新まで</span>
    </div>
    <div class="list-scroll">
      <table class="participant-list">
        <thead><tr><th>順</th><th>氏名</th>${columns.map((item) => ceremonyHeader(item)).join("")}</tr></thead>
        <tbody>${rows.map((name, index) => `<tr><td>${index + 1}</td><th scope="row">${escapeHtml(name)}</th>${columns.map((item, columnIndex) => listCell(item, name, columns.slice(0, columnIndex))).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
  content.querySelector(".download-list-pdf").addEventListener("click", downloadListPdf);
  content.querySelector(".close-list").addEventListener("click", () => collapseHallCard(card));
  const closeFromHeading = () => collapseHallCard(card);
  content.querySelector(".list-close-area").addEventListener("click", closeFromHeading);
  content.querySelector(".list-close-area").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      closeFromHeading();
    }
  });
  card.querySelector(".open-list").textContent = "一覧";
}

function hideInlineList(card) {
  card.querySelector(".inline-list").hidden = true;
  card.querySelector(".people").hidden = false;
  card.querySelector(".open-list").textContent = "一覧";
  inlineListHallId = null;
}

function collapseHallCard(card) {
  hideInlineList(card);
  card.querySelector(".card-detail").hidden = true;
  card.classList.remove("is-open");
  openHallId = null;
}

function ceremonyHeader(item) {
  const hall = item.halls[listHallId];
  const label = CEREMONIES.find(([id]) => id === item.id)?.[3] || item.name;
  const ritsumei = hall?.updatedAt ? hall.ritsumei.length : "—";
  const kuyo = hall?.updatedAt ? hall.kuyo.length : "—";
  return `<th title="${escapeHtml(item.name)}"><span class="ceremony-head"><span>${escapeHtml(label)}</span><span class="ceremony-count"><b>${ritsumei}</b><b>${kuyo}</b></span></span></th>`;
}

function listCell(item, name, pastItems) {
  const hall = item.halls[listHallId];
  if (!hall.updatedAt) return '<td class="list-cell unavailable">—</td>';
  const type = hall.ritsumei.includes(name) ? "ritsumei" : hall.kuyo.includes(name) ? "kuyo" : "";
  if (!type) return '<td class="list-cell absent"><strong>−</strong></td>';
  const knownBefore = pastItems.some((pastItem) => pastItem.halls[listHallId]?.updatedAt);
  const appearedBefore = pastItems.some((pastItem) => {
    const pastHall = pastItem.halls[listHallId];
    return pastHall?.updatedAt && (pastHall.ritsumei.includes(name) || pastHall.kuyo.includes(name));
  });
  const isNew = knownBefore && !appearedBefore;
  return `<td class="list-cell ${type}${isNew ? " new" : ""}"><strong>${isNew ? "新" : "✓"}</strong></td>`;
}

function newBreakdownMarkup(ritsumeiCount, kuyoCount) {
  const number = (count) => `<b class="${count ? "is-positive" : ""}">${count}</b>`;
  return `<span class="new-breakdown"><span>立命行 ${number(ritsumeiCount)}</span><i>／</i><span>供養会 ${number(kuyoCount)}</span></span>`;
}

function render() {
  const c = ceremony();
  const ranges = allocation();
  const isLocked = Boolean(c.snapshotAt);
  document.querySelector("#ceremonySelect").value = state.currentCeremony;
  const deadlineInput = document.querySelector("#deadlineInput");
  deadlineInput.value = c.deadline;
  deadlineInput.disabled = isLocked;
  document.querySelector("#ceremonyTitle").textContent = `${c.name}（${c.date}）`;
  document.querySelector("#ceremonyMeta").textContent = `聖明王院〆切: ${formatDateTime(c.deadline)}`;
  const snapshotStatus = document.querySelector("#snapshotStatus");
  snapshotStatus.hidden = !isLocked;
  snapshotStatus.textContent = isLocked ? `固定済 ${formatDateTime(c.snapshotAt)}` : "";
  const snapshotButton = document.querySelector("#snapshotButton");
  snapshotButton.textContent = isLocked ? "固定を解除" : "〆切時点として固定";
  snapshotButton.classList.toggle("primary", !isLocked);
  snapshotButton.classList.toggle("secondary", isLocked);
  document.querySelector("#advancedImportButton").disabled = isLocked;

  let totalRitsumei = 0;
  let totalKuyo = 0;
  let totalNewRitsumei = 0;
  let totalNewKuyo = 0;
  HALLS.forEach(([hallId]) => {
    const rows = rowsForHall(hallId).filter((row) => row.active);
    totalRitsumei += rows.filter((row) => row.type === "ritsumei").length;
    totalKuyo += rows.filter((row) => row.type === "kuyo").length;
    totalNewRitsumei += rows.filter((row) => row.isNew && row.type === "ritsumei").length;
    totalNewKuyo += rows.filter((row) => row.isNew && row.type === "kuyo").length;
  });

  document.querySelector("#totalEligible").textContent = totalRitsumei + totalKuyo;
  document.querySelector("#totalRitsumei").textContent = totalRitsumei;
  document.querySelector("#totalKuyo").textContent = totalKuyo;
  document.querySelector("#totalNew").innerHTML = newBreakdownMarkup(totalNewRitsumei, totalNewKuyo);
  renderGlobalNewList();

  const cards = document.querySelector("#cards");
  cards.innerHTML = "";
  HALLS.forEach(([hallId, hallName, managerName]) => {
    cards.appendChild(renderHallCard(hallId, hallName, managerName, ranges));
  });
}

function renderGlobalNewList() {
  const container = document.querySelector("#globalNewList");
  if (!globalNewOpen) {
    container.hidden = true;
    return;
  }
  const byType = { ritsumei: [], kuyo: [] };
  HALLS.forEach(([hallId, hallName]) => {
    rowsForHall(hallId).forEach((row) => {
      if (row.active && row.isNew) byType[row.type].push({ name: row.name, hallName });
    });
  });
  const section = (type, label) => `<section class="global-new-section ${type}"><div class="global-new-title ${type}"><span>${label}</span><span>${byType[type].length}名</span></div>${byType[type].length ? byType[type].map(({ name, hallName }) => `<div class="global-new-row">${escapeHtml(name)}<span>（${escapeHtml(hallName)}）</span></div>`).join("") : '<div class="global-new-empty">新規なし</div>'}</section>`;
  container.hidden = false;
  container.innerHTML = `${section("ritsumei", "立命行")}${section("kuyo", "供養会")}`;
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
  const newRitsumeiCount = activeRows.filter((row) => row.isNew && row.type === "ritsumei").length;
  const newKuyoCount = activeRows.filter((row) => row.isNew && row.type === "kuyo").length;
  const isLocked = Boolean(ceremony().snapshotAt);
  const range = ranges[hallId];

  node.querySelector(".hall-name").textContent = hallName;
  node.querySelector(".manager-name").textContent = `担当者: ${managerName}`;
  node.querySelector(".range").textContent = range.count ? `${range.start}〜${range.end}` : "—";
  node.querySelector(".card-stats").innerHTML = [
    ["合計", activeRows.length],
    ["立命行", ritsumeiCount],
    ["供養会", kuyoCount],
    ["新規", newBreakdownMarkup(newRitsumeiCount, newKuyoCount), "stat-new"],
    ["不参加", inactiveCount],
  ].map(([label, value, className = ""]) => {
    const tag = label === "新規" ? "button" : "div";
    const extra = label === "新規" ? " open-new" : "";
    return `<${tag} class="stat ${className}${extra}"${tag === "button" ? ' type="button"' : ""}><span>${label}</span><strong>${value}</strong></${tag}>`;
  }).join("");

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
  [".edit-names", ".auto-number", ".manual-number"].forEach((selector) => {
    node.querySelector(selector).disabled = isLocked;
  });
  node.querySelector(".edit-names").addEventListener("click", () => openEditDialog(hallId));
  node.querySelector(".open-new").addEventListener("click", () => {
    if (!detail.hidden && detailFilters[hallId] === "new" && inlineListHallId !== hallId) {
      detailFilters[hallId] = "all";
      collapseHallCard(node);
      return;
    }
    node.querySelector(".inline-list").hidden = true;
    inlineListHallId = null;
    detail.hidden = false;
    openHallId = hallId;
    node.classList.add("is-open");
    renderPeople(node, hallId, ranges, "new");
  });
  node.querySelector(".open-list").addEventListener("click", () => {
    if (inlineListHallId === hallId) {
      collapseHallCard(node);
      return;
    }
    renderInlineList(node, hallId);
    if (historyNeedsImport()) importHistoryFromAdvanced();
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
  const closeDetail = () => {
    collapseHallCard(node);
  };
  node.querySelector(".close-detail").addEventListener("click", closeDetail);
  node.querySelector(".people").addEventListener("click", (event) => {
    if (event.target.closest("input, button, select, textarea")) return;
    closeDetail();
  });

  return node;
}

function renderPeople(card, hallId, ranges, filter) {
  detailFilters[hallId] = filter;
  const people = card.querySelector(".people");
  const hall = ceremony().halls[hallId];
  const rows = rowsForHall(hallId);
  people.hidden = false;
  people.classList.toggle("new-only", filter === "new");
  people.innerHTML = "";
  let activeIndex = 0;
  ["ritsumei", "kuyo"].forEach((type) => {
    const typeRows = rows.filter((row) => row.type === type);
    const activeTypeRows = typeRows.filter((row) => row.active);
    const newTypeRows = activeTypeRows.filter((row) => row.isNew);
    const section = document.createElement("section");
    section.className = `participant-section ${type}`;
    const title = document.createElement("div");
    title.className = `section-title ${type}`;
    title.innerHTML = `<span>${type === "ritsumei" ? "立命行" : "供養会"}</span><span>${filter === "new" ? newTypeRows.length : activeTypeRows.length}名</span>`;
    section.appendChild(title);
    typeRows.forEach((row, index) => {
      const thisActiveIndex = row.active ? activeIndex++ : null;
      if (filter === "undelivered" && (!row.active || hall.delivered[row.key])) return;
      if (filter === "new" && (!row.active || !row.isNew)) return;
      if (filter === "new") {
        const newRowNode = document.createElement("div");
        newRowNode.className = `new-person-row ${type}`;
        newRowNode.textContent = row.name;
        section.appendChild(newRowNode);
        return;
      }
      const number = row.active ? numberForRow(hallId, row, thisActiveIndex, ranges) : "";
      const rowNode = document.createElement("div");
      rowNode.className = `person-row ${type}${row.active ? "" : " inactive"}${row.isNew ? " is-new" : ""}`;
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
        input.disabled = Boolean(ceremony().snapshotAt);
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
      section.appendChild(rowNode);
    });
    people.appendChild(section);
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
  if (ceremony().snapshotAt) return;
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
