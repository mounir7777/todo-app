const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Body & statische Dateien
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// einfache In‑Memory Daten (später ersetzen wir das durch DB)
let todos = [];
let nextId = 1;

// UI
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API
app.get('/api/todos', (_req, res) => res.json(todos));

app.post('/api/todos', (req, res) => {
  const title = (req.body?.title || '').trim();
  if (!title) return res.status(400).json({error:'Titel fehlt'});
  const todo = { id: nextId++, title, done: false };
  todos.unshift(todo);
  res.status(201).json(todo);
});

app.post('/api/todos/:id/done', (req, res) => {
  const id = Number(req.params.id);
  const t = todos.find(x => x.id === id);
  if (!t) return res.sendStatus(404);
  t.done = true;
  res.sendStatus(204);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(x => x.id !== id);
  res.sendStatus(204);
});

app.listen(PORT, () => console.log(`✅ Server läuft auf http://localhost:${PORT}`));

