const HALLS = [
  ["oedo", "大江戸"], ["odaiba", "お台場"], ["haneda", "羽田"],
  ["kanagawa", "かながわ"], ["fujisan", "富士山"], ["sunten", "駿天"],
  ["saitama", "埼玉"], ["chiba", "千葉"], ["yamanashi", "山梨"],
];

const CEREMONIES = [
  ["senju", "第14回泉珠収天護摩供", "14収天"], ["chiku", "第24回大元地空護摩供", "地空"],
  ["kaikou", "第26回界光宇炎護摩供", "界光"], ["myou", "第31回八大明王護摩供", "明王"],
  ["jizou", "第30回地蔵尊王護摩供", "地蔵"], ["ryuge", "第13回龍華大圓護摩供（陽）", "龍華"],
  ["segaki", "第30回施餓鬼供養護摩供", "施餓鬼"], ["chimei", "第17回治命普済護摩供", "治命"],
  ["gyokuji", "第24回玉璽大環天護摩供", "玉璽"], ["hokuto", "北斗鎮圧護摩供", "北鎮"],
  ["rokuson", "禄存宝珠護摩供", "宝珠"], ["kokufu", "国父の日", "国父の日"],
  ["chosei", "長生南十字星護摩供", "南十字"], ["myozen", "妙善閻魔天王護摩供", "閻魔"],
  ["shuten", "収天大龍華祭", "大龍華祭"], ["chinkon", "鎮魂四海龍王護摩供", "鎮魂"],
  ["senju15", "第15回泉珠収天護摩供", "15収天"],
];

const hallSelect = document.querySelector("#hallSelect");
const content = document.querySelector("#printContent");
const status = document.querySelector("#loadStatus");
let sharedState = null;
let selectedView = new URLSearchParams(location.search).get("view") === "history" ? "history" : "current";

HALLS.forEach(([id, name]) => hallSelect.add(new Option(name, id)));
hallSelect.value = new URLSearchParams(location.search).get("hall") || "oedo";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
}

function ceremonyData(id) {
  return sharedState?.ceremonies?.[id] || { halls: {}, name: CEREMONIES.find(([key]) => key === id)?.[1] || id, date: "" };
}

function hallData(ceremonyId, hallId) {
  return ceremonyData(ceremonyId).halls?.[hallId] || { ritsumei: [], kuyo: [], updatedAt: "" };
}

function currentCeremonyId() {
  return sharedState?.currentCeremony || "segaki";
}

function currentRows(hallId) {
  const ceremonyId = currentCeremonyId();
  const current = hallData(ceremonyId, hallId);
  const currentIndex = CEREMONIES.findIndex(([id]) => id === ceremonyId);
  const past = CEREMONIES.slice(0, currentIndex).map(([id]) => hallData(id, hallId));
  const hasPast = past.some((hall) => hall.updatedAt);
  const seenBefore = new Set(past.filter((hall) => hall.updatedAt).flatMap((hall) => [...hall.ritsumei, ...hall.kuyo]));
  return ["ritsumei", "kuyo"].flatMap((type) => current[type].map((name, index) => ({
    type, name, index, isNew: hasPast && !seenBefore.has(name),
  })));
}

function allocationForHall(hallId) {
  let next = 1;
  for (const [id] of HALLS) {
    const count = currentRows(id).length;
    if (id === hallId) return next;
    next += count;
  }
  return next;
}

function renderCurrent(hallId, hallName) {
  const ceremonyId = currentCeremonyId();
  const current = ceremonyData(ceremonyId);
  const hall = hallData(ceremonyId, hallId);
  const rows = currentRows(hallId);
  const start = allocationForHall(hallId);
  const ritsumeiRows = rows.filter((row) => row.type === "ritsumei");
  const kuyoRows = rows.filter((row) => row.type === "kuyo");
  const rowsPerColumn = 38;
  const pageCount = Math.max(1, Math.ceil(Math.max(ritsumeiRows.length, kuyoRows.length) / rowsPerColumn));
  const section = (type, title, typeRows, pageIndex) => {
    const startIndex = Math.ceil(typeRows.length * pageIndex / pageCount);
    const endIndex = Math.ceil(typeRows.length * (pageIndex + 1) / pageCount);
    const pageRows = typeRows.slice(startIndex, endIndex);
    return `<section class="current-section"><h3>${title}<span>${typeRows.length}名</span></h3><table class="current-table"><thead><tr><th>順</th><th>氏名</th><th>番号</th></tr></thead><tbody>${pageRows.map((row) => {
      const key = `${row.type}:${row.index}:${row.name}`;
      const number = hall.mode === "manual" && hall.manualNumbers?.[key] ? hall.manualNumbers[key] : start + rows.indexOf(row);
      return `<tr><td>${row.index + 1}</td><td class="${row.isNew ? "new" : ""}">${escapeHtml(row.name)}${row.isNew ? " 新" : ""}</td><td>${escapeHtml(number)}</td></tr>`;
    }).join("") || "<tr><td colspan=\"3\">該当者なし</td></tr>"}</tbody></table></section>`;
  };
  return Array.from({ length: pageCount }, (_, pageIndex) => `<article class="print-sheet"><div class="sheet-heading"><h2>${escapeHtml(hallName)}</h2><p>${escapeHtml(current.name)}${current.date ? ` (${current.date})` : ""}${pageCount > 1 ? ` ${pageIndex + 1}/${pageCount}` : ""}</p></div><div class="current-columns">${section("ritsumei", "立命行", ritsumeiRows, pageIndex)}${section("kuyo", "供養会", kuyoRows, pageIndex)}</div></article>`).join("");
}

function historyNames(hallId) {
  const names = [];
  const seen = new Set();
  const currentId = currentCeremonyId();
  const ids = [currentId, ...CEREMONIES.map(([id]) => id).filter((id) => id !== currentId)];
  ids.forEach((id) => {
    const hall = hallData(id, hallId);
    [...hall.ritsumei, ...hall.kuyo].forEach((name) => {
      if (!seen.has(name)) { seen.add(name); names.push(name); }
    });
  });
  return names;
}

function historyMark(ceremonyId, hallId, name, pastIds) {
  const hall = hallData(ceremonyId, hallId);
  if (!hall.updatedAt) return "—";
  if (!hall.ritsumei.includes(name) && !hall.kuyo.includes(name)) return "−";
  const knownBefore = pastIds.some((id) => hallData(id, hallId).updatedAt);
  const appearedBefore = pastIds.some((id) => {
    const past = hallData(id, hallId);
    return past.updatedAt && (past.ritsumei.includes(name) || past.kuyo.includes(name));
  });
  return knownBefore && !appearedBefore ? "新" : "✓";
}

function renderHistory(hallId, hallName) {
  const available = CEREMONIES.filter(([id]) => hallData(id, hallId).updatedAt);
  if (!available.length) return `<article class="print-sheet"><div class="sheet-heading"><h2>${escapeHtml(hallName)}</h2><p>履歴一覧</p></div><p>履歴データがありません。</p></article>`;
  const names = historyNames(hallId);
  const groups = [];
  for (let start = 0; start < available.length; start += 5) groups.push(available.slice(start, start + 5));
  return groups.map((group, groupIndex) => `<article class="print-sheet"><div class="sheet-heading"><h2>${escapeHtml(hallName)} 履歴一覧</h2><p>第14回泉珠収天護摩供から最新まで ${groups.length > 1 ? `${groupIndex + 1}/${groups.length}` : ""}</p></div><table class="history-table"><thead><tr><th>順</th><th>氏名</th>${group.map(([, , label]) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead><tbody>${names.map((name, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(name)}</td>${group.map(([id]) => { const pastIds = CEREMONIES.slice(0, CEREMONIES.findIndex(([key]) => key === id)).map(([key]) => key); const mark = historyMark(id, hallId, name, pastIds); return `<td class="${mark === "新" ? "history-cell-new" : ""}">${mark}</td>`; }).join("")}</tr>`).join("")}</tbody></table></article>`).join("");
}

function render() {
  if (!sharedState) return;
  const hallId = hallSelect.value;
  const hallName = HALLS.find(([id]) => id === hallId)?.[1] || "";
  document.querySelectorAll(".view-button").forEach((button) => button.classList.toggle("is-active", button.dataset.view === selectedView));
  content.innerHTML = selectedView === "history" ? renderHistory(hallId, hallName) : renderCurrent(hallId, hallName);
  const query = new URLSearchParams({ hall: hallId, view: selectedView });
  history.replaceState(null, "", `./print.html?${query}`);
}

hallSelect.addEventListener("change", render);
document.querySelectorAll(".view-button").forEach((button) => button.addEventListener("click", () => { selectedView = button.dataset.view; render(); }));
document.querySelector("#printPageButton").addEventListener("click", () => window.print());

fetch("/api/state")
  .then((response) => response.ok ? response.json() : Promise.reject(new Error("共有データを取得できませんでした。")))
  .then((data) => {
    sharedState = data.state;
    if (!sharedState) throw new Error("共有データがまだありません。割り振り画面を一度開いてください。");
    status.hidden = true;
    render();
  })
  .catch((error) => { status.textContent = error.message; });
