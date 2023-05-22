/**
 * DeviceService module.
 * @module DeviceService
 */

import axios from 'axios';

const url = 'http://localhost:5000/api/devices';

/* eslint-disable no-async-promise-executor */
class DeviceService {
  /**
   * Fetches all devices from the server
   * @function getAllDevices
   * @returns {Promise<Array>} A promise that resolves to an array of devices.
   * @throws Will throw an error if the Axios request fails.
   */
  static getAllDevices() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err.message)
      }
    });
  }

  /**
   * Fetches a specific device using its MAC address.
   * @function getDevice
   * @param {string} mac - The MAC address of the device.
   * @returns {Promise<Object>} A promise that resolves to the device's data.
   * @throws Will throw an error if the Axios request fails.
   */
  static getDevice(mac) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url + "/" + mac);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err.message)
      }
    })
  }

  /**
   * Fetches all devices associated with a particular customer
   * @function getAllCustomerDevices
   * @param {string} customerName - The name of the customer.
   * @returns {Promise<Array>} A promise that resolves to an array of devices owned by the customer.
   * @throws Will throw an error if the Axios request fails.
   */
  static getAllCustomerDevices(customerName) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        const resData = [];

        for (let i = 0; i < data.length; i++) {
          if (data[i].customer === customerName) {
            resData.push(data[i])
          }
        }

        resolve(resData);
      } catch (err) {
        reject(err.message)
      }
    });
  }
}

export default DeviceService;