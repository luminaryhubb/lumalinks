const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'admin123';

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const DATA_FILE = path.join(DATA_DIR, 'pastes.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({ pastes: {} }, null, 2));

function readData(){
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeData(d){
  fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2));
}

app.post('/api/create', (req, res) => {
  const { text, password, redirect } = req.body;
  if (!text || !password) return res.status(400).json({ error: 'Text and password required' });
  const id = nanoid(7);
  const data = readData();
  data.pastes[id] = {
    id,
    text,
    password,
    redirect: redirect || null,
    createdAt: new Date().toISOString(),
    accesses: []
  };
  writeData(data);
  res.json({ link: `/paste/${id}`, id });
});

app.post('/api/verify/:id', (req, res) => {
  const { password } = req.body;
  const id = req.params.id;
  const data = readData();
  const paste = data.pastes[id];
  if (!paste) return res.status(404).json({ error: 'Paste not found' });
  if (paste.password !== password) return res.status(403).json({ error: 'Incorrect password' });
  paste.accesses.push(new Date().toISOString());
  writeData(data);
  if (paste.redirect) return res.json({ redirect: paste.redirect });
  return res.json({ text: paste.text });
});

app.get('/api/paste/:id', (req, res) => {
  const id = req.params.id;
  const data = readData();
  const paste = data.pastes[id];
  if (!paste) return res.status(404).json({ error: 'Paste not found' });
  const { id: pid, createdAt, redirect, accesses } = paste;
  res.json({ id: pid, createdAt, redirect, accessesCount: accesses.length });
});

app.get('/api/admin/pastes', (req, res) => {
  const key = req.header('x-admin-key');
  if (key !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
  const data = readData();
  const list = Object.values(data.pastes).map(p => ({
    id: p.id, createdAt: p.createdAt, redirect: p.redirect, accessesCount: p.accesses.length
  }));
  res.json({ pastes: list });
});

app.get('/api/admin/stats', (req, res) => {
  const key = req.header('x-admin-key');
  if (key !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
  const data = readData();
  const all = [];
  Object.values(data.pastes).forEach(p => {
    (p.accesses || []).forEach(a => all.push(a));
  });
  const counts = {};
  const today = new Date();
  for (let i=6;i>=0;i--){
    const d = new Date(today); d.setDate(today.getDate() - i);
    const keyDay = d.toISOString().slice(0,10);
    counts[keyDay]=0;
  }
  all.forEach(ts => {
    const day = ts.slice(0,10);
    if (counts.hasOwnProperty(day)) counts[day]++;
  });
  res.json({ counts });
});

const clientDist = path.join(process.cwd(), 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API running. Client not built.');
  });
}

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
