import * as express from 'express';
import * as bodyParser from 'body-parser';
import { fakeDeals } from './default-deals';

const Lowdb = require('lowdb');

const app = express();

const ASSETS_DIR = __dirname + '/assets';
const DB_PATH = __dirname + '/db.json';
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(ASSETS_DIR));

const db = new Lowdb(DB_PATH);

db.defaults({ deals: fakeDeals })
  .write();

app.get('/api/deals', (req, res) => {
  res.send(db
    .get('deals')
    .value()
  );
});

app.post('/api/deals', (req, res) => {
  const { value, date } = req.body;
  if (value && date) {
    const lastItem = db
      .get('deals')
      .last()
      .value();

    const nextId = lastItem ? lastItem.id + 1 : 1;

    db.get('deals')
      .push({ id: nextId, value, date })
      .write();

    res.send(db.get('deals').value());
  } else {
    res.sendStatus(400);
  }
});

app.delete('/api/deals/:id', (req, res) => {
  console.log(req.params.id);
  db.get('deals')
    .remove({ id: Number(req.params.id) })
    .write();
  res.send(db.get('deals').value());
});

app.get('*', (req, res) => res.sendFile(__dirname + '/assets/index.html'));

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}/`));
