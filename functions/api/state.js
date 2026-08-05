const STATE_KEY = "shared-state-v1";

export async function onRequestGet({ env }) {
  const saved = await env.ALLOCATION_STATE.get(STATE_KEY, "json");
  return json(saved || { state: null, updatedAt: "" });
}

export async function onRequestPut({ request, env }) {
  const { state } = await request.json();
  if (!state || typeof state !== "object" || !state.ceremonies) {
    return json({ error: "共有するデータが正しくありません。" }, 400);
  }

  const updatedAt = new Date().toISOString();
  await env.ALLOCATION_STATE.put(STATE_KEY, JSON.stringify({ state, updatedAt }));
  return json({ updatedAt });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
