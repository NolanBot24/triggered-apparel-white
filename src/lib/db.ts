/**
 * lib/db.ts
 *
 * Singleton SQLite database connection using Node's built-in node:sqlite module.
 * Creates the database file at the project root: data/orders.db
 *
 * Tables created on first boot:
 *   - orders: tracks CustomCat order status and shipping info
 */

import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "orders.db");

// Ensure the data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Module-level singleton — reused across hot-reloads in dev
const globalForDb = globalThis as unknown as { _db?: DatabaseSync };

const db: DatabaseSync =
  globalForDb._db ??
  (() => {
    const instance = new DatabaseSync(DB_PATH);

    // Enable WAL mode for better concurrent performance
    instance.exec("PRAGMA journal_mode = WAL;");

    // ── Create tables on first boot ────────────────────────────────────────────
    instance.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id                  INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id            TEXT NOT NULL UNIQUE,       -- Your internal order ID
        customcat_order_id  TEXT,                       -- CustomCat's order ID
        status              TEXT NOT NULL DEFAULT 'pending',
        fulfillment_status  TEXT,
        tracking_number     TEXT,
        tracking_url        TEXT,
        items_remaining     INTEGER,
        raw_webhook         TEXT,                       -- JSON blob of the last webhook payload
        created_at          TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);

    return instance;
  })();

if (process.env.NODE_ENV !== "production") {
  globalForDb._db = db;
}

export default db;

