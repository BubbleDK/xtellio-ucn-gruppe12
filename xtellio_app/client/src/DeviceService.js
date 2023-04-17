import axios from 'axios';

const url = 'http://localhost:5000/api/devices';

/* eslint-disable no-async-promise-executor */
class DeviceService {
  // Get Devices
  static getAllDevices() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;

        resolve(data);
      } catch(err) {
        reject(err.message)
      }
    });
  }

  // Get specific device
  static getDevice(mac) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url + "/" + mac);
        const data = res.data;

        resolve(data);
      } catch(err) {
        reject(err.message)
      }
    })
  }

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
      } catch(err) {
        reject(err.message)
      }
    });
  }
}

export default DeviceService;