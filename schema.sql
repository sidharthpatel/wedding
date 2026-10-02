CREATE TABLE IF NOT EXISTS guests (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  seats INTEGER NOT NULL DEFAULT 1,
  events TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS rsvps (
  key TEXT PRIMARY KEY,          -- invite code, or "n:<lowercase name>" for open RSVPs
  code TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  party_size INTEGER NOT NULL DEFAULT 1,
  party_names TEXT,
  events TEXT NOT NULL DEFAULT '[]',
  meal TEXT,
  dietary TEXT,
  song TEXT,
  message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
