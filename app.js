const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// In-Memory ToDo Liste (nur für Test)
let todos = [];

// Startseite
app.get('/', (req, res) => {
  res.send('Willkommen zur ToDo-App API! Endpunkte: GET /todos, POST /todos');
});

// Alle Todos anzeigen
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Neues Todo hinzufügen
app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Titel ist erforderlich' });
  }
  const newTodo = { id: todos.length + 1, title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Server starten
app.listen(port, () => {
  console.log(`✅ Server läuft unter http://localhost:${port}`);
});
