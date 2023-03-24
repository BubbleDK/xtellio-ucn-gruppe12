const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Devices
let resDevices = [];
let hasRecentlyUpdated = false;

const startCountdown = () => {
  console.log("I got triggered")
  hasRecentlyUpdated = true;
  setTimeout(() => {
    hasRecentlyUpdated = false;
    resDevices = [];
  }, 3600000) // 1 hour
}


router.get('/', async (req, res) => {
  if (hasRecentlyUpdated) { 
    res.send(resDevices) 
  } else {
    const devices = await loadDeviceCollection();
    const response = await devices.find({}).toArray()
    resDevices = response[0].results;
    startCountdown();
    res.send(response[0].results);
  };
})

// Get Devices
router.get('/:id', async (req, res) => {
  const devices = await loadDeviceCollection();
  const response = await devices.find({ "results.mac": req.params.id });

  res.send(response);
})

async function loadDeviceCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://gruppe12:test1234@cluster0.o9hgjso.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

  return client.db('Xtellio_Api').collection('devices')
}

module.exports = router;