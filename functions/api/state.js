const STATE_KEY = "shared-state-v1";
const HALL_IDS = ["oedo", "odaiba", "haneda", "kanagawa", "fujisan", "sunten", "saitama", "chiba", "yamanashi"];

export async function onRequestGet({ env }) {
  const saved = await env.ALLOCATION_STATE.get(STATE_KEY, "json");
  if (saved?.state && clearLegacyChinkon(saved.state)) {
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

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
