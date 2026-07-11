const Database = require('better-sqlite3');

const db = new Database('quiz.db');
db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT NOT NULL UNIQUE
    )
  `);

db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id   INTEGER NOT NULL,
      question_text TEXT NOT NULL,
      answer_text   TEXT NOT NULL,
      difficulty    TEXT NOT NULL CHECK(difficulty IN ('easy', 'medium', 'hard')),
      FOREIGN KEY   (category_id) REFERENCES categories(id)
    )
  `);

module.exports = db;
