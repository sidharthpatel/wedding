# Wedding RSVP — wedding.sidharthpatel.com

Static site (`public/`) + Cloudflare Pages Functions (`functions/`) + D1 database. No build step.

## Edit content
- `public/config.js` — names, events, dates, venues, dress codes, FAQ. Events with `date: null` show "Date coming soon".
- `public/index.html` — "Our Story" text.
- `public/assets/hero.webp` — hero photo.

## Language
The nav has an English / ગુજરાતી toggle (remembers the choice). Static strings live in `public/i18n.js`; event blurbs, dress codes and FAQ have `...Gu` fields in `public/config.js`. Set `groomGu` / `brideGu` / `cityGu` to show names in Gujarati script. Review the Gujarati wording with family before sending.

## Run locally
```bash
npm i -g wrangler            # or: npx wrangler ...
wrangler d1 create wedding-rsvp          # copy database_id into wrangler.toml
wrangler d1 execute wedding-rsvp --local --file=schema.sql
echo 'ADMIN_TOKEN=pick-a-long-secret' > .dev.vars
wrangler pages dev public --d1 DB=wedding-rsvp
```

## Deploy
1. Push this folder to a new GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
   Build command: *(none)* · Output directory: `public`
3. Create the production DB and load the schema:
   `wrangler d1 execute wedding-rsvp --remote --file=schema.sql`
4. Pages project → Settings → Bindings → add **D1 database** binding named `DB` → `wedding-rsvp`.
5. Settings → Variables and Secrets → add secret `ADMIN_TOKEN`.
6. Custom domains → add `wedding.sidharthpatel.com` (Cloudflare creates the DNS record automatically).
7. Redeploy once so bindings take effect.

## Using it
- Admin dashboard: `/admin.html` (enter your ADMIN_TOKEN). See responses, totals per event, CSV export.
- Personalised invites: in admin, paste `Patel Family, 4` lines to get a unique link per household
  (`/?invite=CODE`) that pre-fills their name and caps their party size. Send via WhatsApp.
- Without an invite link, anyone can RSVP by typing their name (open mode).
