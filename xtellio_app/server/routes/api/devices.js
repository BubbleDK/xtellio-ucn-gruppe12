/**
 * Devices API module.
 * @module api/devices
 */

const express = require('express');
const axios = require('axios');

/**
 * Express router to mount devices related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();

/**
 * Cache for device data, updated every hour.
 * @type {Array.<Device>}
 */
let resDevices = [];
/**
 * Indicator of whether the devices cache has been updated recently.
 * @type {boolean}
 */
let hasRecentlyUpdated = false;

/**
 * The URL for the Xtellio devices API.
 * @type {string}
 */
const url = 'https://admin.xtellio.com/web/devices/?order=-updated_at&size=1000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQwNzQ5OEB1Y24uZGsiLCJ0aWQiOiJMYWdlciBYdGVsOmFhYmRiMzI4NmQ4NDQ3ZWFhZWFlOTQ0YTdlMTNkZGZmIiwiYXVkIjoic2VydmVyOnRva2VuIn0.n1wKPHnk6Aue8ZJEHnlOTHCHBQ2BwpL0OeQqDjtwDxc';
let page = 1;

/**
 * Starts a countdown of 1 hour, after which the devices cache will be cleared.
 */
const startCountdown = () => {
  hasRecentlyUpdated = true;
  setTimeout(() => {
    hasRecentlyUpdated = false;
    resDevices = [];
  }, 3600000) // 1 hour
}

/**
 * Route serving a list of all devices.
 * @name get/
 * @function
 * @memberof module:api/devices
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
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

        if (json_data.length < 100) {
          break;
        }

        page += 1;
      } catch (error) {
        break;
      }
    }
    startCountdown();
    res.send(resDevices);
  };
})

/**
 * Route serving a specific device by MAC address.
 * @name get/:id
 * @function
 * @memberof module:api/devices
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', async (req, res) => {
  for (let i = 0; i < resDevices.length; i++) {
    if (resDevices[i].mac === req.params.id) {
      res.send(resDevices[i]);
    }
  }
  return null; // return null if the object is not found
})

module.exports = router;