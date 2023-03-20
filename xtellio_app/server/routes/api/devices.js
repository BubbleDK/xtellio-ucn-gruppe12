const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Devices
router.get('/', async (req, res) => {
  const devices = await loadDeviceCollection();
  const response = await devices.find({}).toArray()
  res.send(response[0].results);
})

async function loadDeviceCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://gruppe12:test1234@cluster0.o9hgjso.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

  return client.db('Xtellio_Api').collection('devices')
}

module.exports = router;