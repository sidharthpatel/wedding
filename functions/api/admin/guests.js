import { json, clip, isAdmin } from "../../_util.js";

const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
const makeCode = () => Array.from(crypto.getRandomValues(new Uint8Array(7)), (n) => alphabet[n % alphabet.length]).join("");

// Body: { guests: [{ name, seats, events: [ids] }] }  -> returns invite codes
export async function onRequestPost({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "Unauthorized" }, 401);
  const { guests } = await request.json().catch(() => ({}));
  if (!Array.isArray(guests) || !guests.length) return json({ error: "No guests" }, 400);
  const out = [];
  for (const g of guests.slice(0, 300)) {
    const code = makeCode();
    const name = clip(g.name, 120); if (!name) continue;
    const seats = Math.min(10, Math.max(1, parseInt(g.seats, 10) || 1));
    const events = Array.isArray(g.events) ? g.events.map((e) => clip(e, 40)) : [];
    await env.DB.prepare("INSERT INTO guests (code, name, seats, events) VALUES (?,?,?,?)").bind(code, name, seats, JSON.stringify(events)).run();
    out.push({ code, name, seats });
  }
  return json({ created: out });
}

export async function onRequestDelete({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "Unauthorized" }, 401);
  const code = clip(new URL(request.url).searchParams.get("code"), 40);
  await env.DB.prepare("DELETE FROM guests WHERE code = ?").bind(code).run();
  return json({ ok: true });
}
