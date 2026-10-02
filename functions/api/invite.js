import { json, clip } from "../_util.js";

export async function onRequestGet({ request, env }) {
  const code = clip(new URL(request.url).searchParams.get("code"), 40);
  const g = await env.DB.prepare("SELECT * FROM guests WHERE code = ?").bind(code).first();
  if (!g) return json({ error: "not found" }, 404);
  const ex = await env.DB.prepare("SELECT * FROM rsvps WHERE key = ?").bind(code).first();
  return json({ name: g.name, seats: g.seats, events: JSON.parse(g.events || "[]"), existing: ex || null });
}
