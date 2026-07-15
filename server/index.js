const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.get('/categories', (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories').all();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/questions', (req, res) => {
  try {
    const category = req.query.category;
    const categoriesId = db.prepare('SELECT id FROM categories WHERE name = ?').get(category);

    const question = db.prepare('SELECT * FROM questions WHERE category_id = ?').all(categoriesId.id);
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
