import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;
export type User = { username: string; fullname: string; id?: number };

export async function getDb(): Promise<Database> {
  if (db) return db;
  db = await Database.load("sqlite:mydatabase.db");

  await db.execute(
    "CREATE TABLE IF NOT EXISTS myusers (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, fullname TEXT)",
  );

  await db.execute(
    "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value INTEGER)",
  );

  return db;
}

export async function addUser(user: User) {
  const db = await getDb();
  await db.execute("INSERT INTO myusers (username, fullname) VALUES (?, ?)", [
    user.username,
    user.fullname,
  ]);
  const result = await db.select<User[]>("SELECT * FROM myusers");
  if (result) {
    return true;
  } else return false;
}

export async function deleteuser(id: number) {
  const db = await getDb();
  await db.execute("DELETE FROM myusers WHERE id = ?", [id]);
  const result = await db.select<User[]>("SELECT * FROM myusers");
  return result;
}

export async function get_settings_data() {
  const db = await getDb();
  const result = await db.select("SELECT * FROM settings");
  return result;
}

import { neon } from "@neondatabase/serverless";

const sql = neon(
  "postgresql://neondb_owner:npg_USfzM8Rrb9uV@ep-frosty-field-aprssidz-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  {
    disableWarningInBrowsers: true,
  },
);

export async function getposts() {
  const posts = await sql`SELECT * FROM testdb`;
  return posts;
}

// See https://neon.com/docs/serverless/serverless-driver
// for more information
