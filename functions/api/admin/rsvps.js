import { json, isAdmin } from "../../_util.js";

export async function onRequestGet({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "Unauthorized" }, 401);
  const [rsvps, guests] = await Promise.all([
    env.DB.prepare("SELECT * FROM rsvps ORDER BY updated_at DESC").all(),
    env.DB.prepare("SELECT * FROM guests ORDER BY name").all(),
  ]);
  return json({ rsvps: rsvps.results, guests: guests.results });
}
