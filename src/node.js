const express = require('express');
const cors = require('cors');
const { response } = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3003;

const URI = 'mongodb+srv://RokasR:Nesakysiu1@cao.q3voh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(URI);

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('node8').collection('pets').find().toArray();
    // PASIIMTI PAGAL KITA KRITERIJU, NAME//
    // const data = await con.db('demo1').collection('cars').find({ name: 'Rokas' }).toArray();
    // PASIIMTI PAGAL ID
    // const data = await con.db('demo1').collection('cars').find(ObjectId('6256f4d5c286dabc6bcaccf8')).toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post('/', async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db('node8').collection('pets').insertOne({ name: 'Alisa', type: 'Kate', age: 7 });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(PORT, () => console.log('express is online,', PORT));
