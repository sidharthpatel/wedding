import { json, clip } from "../_util.js";

export async function onRequestPost({ request, env }) {
  let b;
  try { b = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }
  if (b.website) return json({ ok: true }); // honeypot

  const name = clip(b.name, 120);
  if (!name) return json({ error: "Please enter your name." }, 400);

  let key = "n:" + name.toLowerCase();
  let code = null, maxSeats = 10, allowed = null;
  if (b.code) {
    const g = await env.DB.prepare("SELECT * FROM guests WHERE code = ?").bind(clip(b.code, 40)).first();
    if (!g) return json({ error: "This invitation link isn't valid." }, 400);
    code = g.code; key = g.code; maxSeats = g.seats;
    allowed = JSON.parse(g.events || "[]");
  }

  let events = Array.isArray(b.events) ? b.events.map((e) => clip(e, 40)).slice(0, 20) : [];
  if (allowed && allowed.length) events = events.filter((e) => allowed.includes(e));
  const party = events.length ? Math.min(maxSeats, Math.max(1, parseInt(b.party_size, 10) || 1)) : 0;

  await env.DB.prepare(
    `INSERT INTO rsvps (key, code, name, email, phone, party_size, party_names, events, meal, dietary, song, message)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
     ON CONFLICT(key) DO UPDATE SET name=excluded.name, email=excluded.email, phone=excluded.phone,
       party_size=excluded.party_size, party_names=excluded.party_names, events=excluded.events,
       meal=excluded.meal, dietary=excluded.dietary, song=excluded.song, message=excluded.message,
       updated_at=datetime('now')`
  ).bind(key, code, name, clip(b.email, 200), clip(b.phone, 40), party, clip(b.party_names, 500),
    JSON.stringify(events), clip(b.meal, 60), clip(b.dietary, 300), clip(b.song, 200), clip(b.message, 1500)).run();

  return json({ ok: true });
}
