const STATE_KEY = "shared-state-v1";
const HALL_IDS = ["oedo", "odaiba", "haneda", "kanagawa", "fujisan", "sunten", "saitama", "chiba", "yamanashi"];
const PARTICIPANT_NAME_CORRECTIONS = {
  石破福子: "石橋　福子", 石橋福子: "石橋　福子",
  今田ミサ子: "今田　ミサ子", 守屋正裕: "守屋　正裕", 村上勝: "村上　勝", 岡本千穂: "岡本　千穂", 髙濱仁美: "髙濱　仁美", 高濱仁美: "髙濱　仁美", 天野公子: "天野　公子", 新野惠里乃: "新野　惠里乃", 新野恵里乃: "新野　惠里乃", 中野寿恵: "中野　寿恵", 高木詔治: "高木　詔治", 高木詔二: "高木　詔治", 齋藤久子: "齋藤　久子",
  梅澤碧: "梅澤　碧", 根本武: "根本　武", 樫村有: "樫村　有", 友田光: "友田　光", 友田空: "友田　空", 友田瞬: "友田　瞬", 友田凪: "友田　凪", 石黑貴子: "石黑貴子", 石黒貴子: "石黑貴子", 石黑健司: "石黑健司", 石黒健司: "石黑健司", 石黑基以: "石黑基以", 石黒基以: "石黑基以", 石黑百果: "石黑百果", 石黒百果: "石黑百果", 石黑康平: "石黑康平", 石黒康平: "石黑康平", 海老原泰大: "海老原泰大", 海老原泰太: "海老原泰大", 田口加容子: "田口加容子", 田口加奈子: "田口加容子", 樺山和晃: "樺山和晃", 権山和晃: "樺山和晃", 樺山舞: "樺山舞", 権山舞: "樺山舞", 根來久美子: "根來久美子", 根来久美子: "根來久美子", 大原清一: "大原清一", 大原清二: "大原清一",
  新間紗織: "新間紗織", 新間沙織: "新間紗織", 高栁麻理子: "高栁麻理子", 高柳麻理子: "高栁麻理子", 髙栁麻理子: "高栁麻理子", 田中良実: "田中良実", 田中良美: "田中良実", 上原悟: "上原　悟", 佐野円: "佐野　円", 渡邊欣: "渡邊　欣", 栁澤みどり: "栁澤みどり", 柳澤みどり: "栁澤みどり", 鈴木眞喜: "鈴木眞喜", 鈴木真喜: "鈴木眞喜", 高橋範男: "高橋範男", 高橋篤男: "高橋範男", 齊藤知子: "齊藤知子", 齊藤和子: "齊藤知子", 仲野頼紗: "仲野頼紗", 仲野頼妙: "仲野頼紗", 柏木マリヱ: "柏木マリヱ", 柏木マリエ: "柏木マリヱ", "岡﨑千帆": "岡崎千帆", 岡崎千帆: "岡崎千帆",
};

export async function onRequestGet({ env }) {
  const saved = await env.ALLOCATION_STATE.get(STATE_KEY, "json");
  if (saved?.state && (clearLegacyChinkon(saved.state) || correctParticipantNames(saved.state))) {
    saved.updatedAt = new Date().toISOString();
    await env.ALLOCATION_STATE.put(STATE_KEY, JSON.stringify(saved));
  }
  return json(saved || { state: null, updatedAt: "" });
}

export async function onRequestPut({ request, env }) {
  const { state } = await request.json();
  if (!state || typeof state !== "object" || !state.ceremonies) {
    return json({ error: "共有するデータが正しくありません。" }, 400);
  }

  clearLegacyChinkon(state);
  correctParticipantNames(state);
  const updatedAt = new Date().toISOString();
  await env.ALLOCATION_STATE.put(STATE_KEY, JSON.stringify({ state, updatedAt }));
  return json({ updatedAt });
}

function clearLegacyChinkon(state) {
  if (state.legacyChinkonCleared) return false;
  const ceremony = state.ceremonies?.chinkon;
  if (ceremony?.halls) {
    HALL_IDS.forEach((hallId) => {
      const hall = ceremony.halls[hallId];
      if (!hall) return;
      hall.ritsumei = [];
      hall.kuyo = [];
      hall.inactive = [];
      hall.delivered = {};
      hall.manualNumbers = {};
      hall.updatedAt = "";
    });
  }
  state.legacyChinkonCleared = true;
  return true;
}

function correctParticipantNames(state) {
  let changed = false;
  Object.values(state.ceremonies || {}).forEach((ceremony) => {
    Object.values(ceremony.halls || {}).forEach((hall) => {
      ["ritsumei", "kuyo"].forEach((type) => {
        const originalNames = hall[type] || [];
        const correctedNames = [];
        originalNames.forEach((originalName, originalIndex) => {
          const correctedName = correctParticipantName(originalName);
          let correctedIndex = correctedNames.indexOf(correctedName);
          if (correctedIndex < 0) {
            correctedIndex = correctedNames.length;
            correctedNames.push(correctedName);
          }
          if (originalName !== correctedName || originalIndex !== correctedIndex) {
            remapPersonKey(hall.delivered, type, originalIndex, originalName, correctedIndex, correctedName);
            remapPersonKey(hall.manualNumbers, type, originalIndex, originalName, correctedIndex, correctedName);
            changed = true;
          }
        });
        hall[type] = correctedNames;
      });
    });
  });
  return changed;
}

function correctParticipantName(name) {
  const compactName = String(name || "").replace(/[ 　]/g, "");
  return PARTICIPANT_NAME_CORRECTIONS[compactName] || name;
}

function remapPersonKey(record = {}, type, oldIndex, oldName, newIndex, newName) {
  const oldKey = `${type}:${oldIndex}:${oldName}`;
  const newKey = `${type}:${newIndex}:${newName}`;
  if (oldKey !== newKey && record[oldKey] && !record[newKey]) record[newKey] = record[oldKey];
  if (oldKey !== newKey) delete record[oldKey];
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
