const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const app = express();

const URI = 'mongodb+srv://RokasR:Nesakysiu1@cao.q3voh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(URI);

const PORT = 3003;

// Global MiddleWare
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes

app.get('/pets', async (req, res) => {
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

app.post('/pets', async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db('node8').collection('pets').insertOne({ name: 'Alisa', type: 'Cat', age: 7 });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get('/pets/byoldest', async (req, res) => {
  try {
    // const { sortOrder } = req.params;
    // let order = 1;
    // order = sortOrder = 'byoldest' ? -1 : 1;
    // const options = {
    //   sort: { age: order },
    // };
    //prisijungti
    await client.connect();
    const collection = await client.db('node8').collection('pets');
    const petsArr = await collection.find({}).sort({ age: -1 }).toArray();
    console.log('connected');
    res.json(petsArr);
  } catch (err) {
    console.error('error in get users', err);
    res.status(500).json('something is wrong');
  } finally {
    //uzdaryti prisijungima
    await client.close();
  }
});

app.get('/pets/type/:type', async (req, res) => {
  const { type } = req.params;
  const typesArr = await findPetsByType(type);
  if (typesArr === false) {
    res.status(500).json('not work');
  }
  res.json(typesArr);
  async function findPetsByType(typeParam) {
    try {
      const con = await client.connect();
      // PASIIMTI PAGAL KITA KRITERIJU, TYPE (DINAMINIS)//
      const data = await con.db('node8').collection('pets').find({ type: typeParam }).toArray();
      await con.close();
      return res.send(data);
    } catch (err) {
      res.status(500).send({ err });
    }
  }
});

app.listen(PORT, () => console.log('express is online,', PORT));
