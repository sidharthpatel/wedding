export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

export const clip = (v, n = 500) => String(v ?? "").trim().slice(0, n);

// Constant-time-ish bearer token check for admin endpoints.
export function isAdmin(request, env) {
  const t = (request.headers.get("authorization") || "").replace(/^Bearer /, "");
  const s = env.ADMIN_TOKEN || "";
  if (!s || t.length !== s.length) return false;
  let d = 0;
  for (let i = 0; i < s.length; i++) d |= t.charCodeAt(i) ^ s.charCodeAt(i);
  return d === 0;
}
