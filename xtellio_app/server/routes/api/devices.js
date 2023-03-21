const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Devices
router.get('/', async (req, res) => {
  const devices = await loadDeviceCollection();
  const response = await devices.find({}).toArray()
  res.send(response[0].results);
})

// Get Devices
router.get('/:id', async (req, res) => {
  const devices = await loadDeviceCollection();
  console.log(req.params.id, typeof req.params.id)
  const response = await devices.find({ "results.mac": req.params.id });
  console.log(response)
  res.send(response);
})

async function loadDeviceCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://gruppe12:test1234@cluster0.o9hgjso.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

  return client.db('Xtellio_Api').collection('devices')
}

module.exports = router;