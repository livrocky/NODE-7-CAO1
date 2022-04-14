const express = require('express');
const cors = require('cors');
const { response } = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3002;

const URI = 'mongodb+srv://RokasR:Nesakysiu1@cao.q3voh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(URI);

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('demo1').collection('cars').find().toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post('/', async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db('demo1').collection('cars').insertOne({ name: 'Alisa', surname: 'Kate' });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(PORT, () => console.log('express is online,', PORT));
