const STATE_KEY = "shared-state-v1";
const HALL_IDS = ["oedo", "odaiba", "haneda", "kanagawa", "fujisan", "sunten", "saitama", "chiba", "yamanashi"];

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
  const corrections = {
    石破福子: "石橋　福子",
    石橋福子: "石橋　福子",
    柏木マリエ: "柏木マリヱ",
    "岡﨑千帆": "岡崎千帆",
  };
  return corrections[compactName] || name;
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
