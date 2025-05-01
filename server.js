// server.js  — local-dev helper for the prerequisite-graph project
//
//  ➜  npm install            # first time only
//  ➜  npm run dev            # http://localhost:3000
//
//  ────────────────────────────────────────────────────────────────────

const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

// 1️⃣  Serve everything in /docs (HTML, JS, CSS, JSON, images …)
app.use(express.static(path.join(__dirname, 'docs')));

// 2️⃣  Simple API so your front-end can hit  /api/courses  while developing
app.get('/api/courses', (req, res) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, 'docs', 'courses.json'),
      'utf8'
    );
    res.type('application/json').send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to read courses.json' });
  }
});

// 3️⃣  Catch-all so a hard-refreshed deep link (e.g. /course/CSC241) still
//     returns index.html instead of a 404.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(PORT, () =>
  console.log(`✓ Dev server running →  http://localhost:${PORT}`)
);

