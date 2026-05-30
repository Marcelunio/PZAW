import { DatabaseSync } from "node:sqlite";
import { randomBytes } from "node:crypto";
import { getUser } from "./users.js";
import morgan from "morgan";
const db_path = "./db.sqlite";
const db = new DatabaseSync(db_path, { readBigInts: true });

const SESSION_COOKIE = "__Host-forum-id";
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

db.exec(`
  CREATE TABLE IF NOT EXISTS sesje (
    id              INTEGER PRIMARY KEY,
    user_id         INTEGER,
    created_at      INTEGER
  ) STRICT;
  `);

const db_ops = {
  create_session: db.prepare(
    "INSERT INTO sesje (id, user_id, created_at) VALUES (?, ?, ?) RETURNING id, user_id, created_at;",
  ),
  get_session: db.prepare(
    "SELECT id, user_id, created_at from sesje WHERE id = ?;",
  ),
  delete_session: db.prepare("DELETE FROM sesje WHERE id = ?;"),
};

export function createSession(user_id, res) {
  let session_id = randomBytes(8).readBigInt64BE();
  let created_at = Date.now();

  let session = db_ops.create_session.get(session_id, user_id, created_at);
  res.locals.session = session;
  res.locals.user = session.user_id != null ? get_user(session.user_id) : null;

  res.cookie(SESSION_COOKIE, session.id.toString(), {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: true,
  });
  return session;
}

function sessionHandler(req, res, next) {
  let session_id = req.cookies[SESSION_COOKIE];
  let session = null;
  if (session_id != null) {
    if (!session_id.match(/^-?[0-9]+$/)) {
      // Invalid session id
      session_id = null;
    } else {
      session_id = BigInt(session_id);
    }
  }

  // session_id may look valid but might not exist in db
  if (session_id != null) session = db_ops.get_session.get(session_id);

  if (session != null) {
    res.locals.session = session;
    res.locals.user = session.user_id != null ? get_user(session.user_id) : null;

    res.cookie(SESSION_COOKIE, res.locals.session.id.toString(), {
      maxAge: ONE_WEEK,
      httpOnly: true,
      secure: true,
    });
  } else {
    session = createSession(null, res);
  }

  next();

}

export function deleteSession(res) {
  let session_id = res.locals.session.id;
  db_ops.delete_session.run(session_id);

  res.cookie(SESSION_COOKIE, session_id.toString(), {
    maxAge: 0,
    httpOnly: true,
    secure: true,
  });
}

 morgan.token("session", function (req, res) {;
  return ["session_id: ",res.locals.session.id,"user_id: ",res.locals.session.user_id,"date: ", new Date(Number(res.locals.session.created_at)).toISOString()].join(" ");
});

export default {
  createSession,
  deleteSession,
  sessionHandler,
};