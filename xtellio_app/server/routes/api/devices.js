const express = require('express');
const axios = require('axios');

const router = express.Router();

// Get Devices
let resDevices = [];
let hasRecentlyUpdated = false;

const url = 'https://admin.xtellio.com/web/devices/?order=-updated_at&size=1000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQwNzQ5OEB1Y24uZGsiLCJ0aWQiOiJMYWdlciBYdGVsOmFhYmRiMzI4NmQ4NDQ3ZWFhZWFlOTQ0YTdlMTNkZGZmIiwiYXVkIjoic2VydmVyOnRva2VuIn0.n1wKPHnk6Aue8ZJEHnlOTHCHBQ2BwpL0OeQqDjtwDxc';
let page = 1;

const startCountdown = () => {
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
    while (true) {
      try {
        const response = await axios.get(`${url}&page=${page}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json_data = response.data.results;
  
        if (json_data.length === 0) {
          break;
        }
  
        resDevices = resDevices.concat(json_data);
        page += 1;
      } catch (error) {
        console.error(error);
        break;
      }
    }
    startCountdown();
    res.send(resDevices);
  };
})

// Get Devices
router.get('/:id', async (req, res) => {
  for (let i = 0; i < resDevices.length; i++) {
    if (resDevices[i].mac === req.params.id) {
      res.send(resDevices[i]);
    }
  }
  return null; // return null if the object is not found
})

module.exports = router;