const db = require('./db');

const categories = ['JavaScript', 'React', 'SQL'];

const categoryIds = {};
const insertCategory= db.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)');
const getCategoryId = db.prepare('SELECT id FROM categories WHERE name = ?');

categories.forEach(name => {
  insertCategory.run(name);
  categoryIds[name] = getCategoryId.get(name).id;
});

const questions = [
  { category: 'JavaScript', question: "What's the difference between let, const, and var?", answer: "var is function-scoped and hoisted with undefined; let/const are block-scoped and live in a temporal dead zone until declared. const can't be reassigned.", difficulty: 'easy' },
  { category: 'JavaScript', question: "What is the difference between == and ===?", answer: "== coerces types before comparing; === checks value and type without coercion.", difficulty: 'easy' },
  { category: 'JavaScript', question: "Explain closures.", answer: "A closure is a function that retains access to its outer scope's variables even after the outer function has returned.", difficulty: 'medium' },
  { category: 'JavaScript', question: "What's the event loop?", answer: "It's the mechanism that lets JS (single-threaded) handle async operations by moving completed callbacks/promises into the call stack once it's empty.", difficulty: 'medium' },
  { category: 'JavaScript', question: "What's the difference between Promise.all and Promise.allSettled?", answer: "Promise.all rejects immediately if any promise fails; Promise.allSettled waits for all and returns each outcome.", difficulty: 'hard' },

  { category: 'React', question: "What is a component in React?", answer: "A reusable, independent piece of UI, usually a function that returns JSX.", difficulty: 'easy' },
  { category: 'React', question: "What's the difference between props and state?", answer: "Props are passed in from a parent and read-only; state is managed internally and can change over time.", difficulty: 'easy' },
  { category: 'React', question: "What does useEffect do?", answer: "It runs side effects after render, and can clean up via a returned function.", difficulty: 'medium' },
  { category: 'React', question: "Why do lists need a key prop?", answer: "Keys help React identify which items changed, were added, or removed, for efficient updates.", difficulty: 'medium' },
  { category: 'React', question: "What's the difference between controlled and uncontrolled components?", answer: "Controlled components have their value driven by React state; uncontrolled components manage their own state internally via refs.", difficulty: 'hard' },

  { category: 'SQL', question: "What's the difference between INNER JOIN and LEFT JOIN?", answer: "INNER JOIN returns only matching rows; LEFT JOIN returns all left-table rows plus matches (NULL if none).", difficulty: 'easy' },
  { category: 'SQL', question: "What's the difference between WHERE and HAVING?", answer: "WHERE filters rows before grouping; HAVING filters groups after GROUP BY.", difficulty: 'medium' },
  { category: 'SQL', question: "What is a primary key vs a foreign key?", answer: "A primary key uniquely identifies a row; a foreign key references a primary key in another table.", difficulty: 'medium' },
  { category: 'SQL', question: "What's the N+1 query problem?", answer: "Fetching a list with one query, then issuing a separate query per record instead of batching with a join.", difficulty: 'hard' },
  { category: 'SQL', question: "What's the difference between DELETE, TRUNCATE, and DROP?", answer: "DELETE removes rows and can be rolled back; TRUNCATE removes all rows fast; DROP removes the whole table.", difficulty: 'hard' },
];

const insertQuestion = db.prepare(`
  INSERT INTO questions (category_id, question_text, answer_text, difficulty)
  VALUES (?, ?, ?, ?)
`);

questions.forEach(q => {
  insertQuestion.run(categoryIds[q.category], q.question, q.answer, q.difficulty);
});

console.log('Seeded database with', categories.length, 'categories and', questions.length, 'questions.');
