import axios from 'axios';

const url = 'http://localhost:5000/api/devices';


const findItemInArray = (array, mac) => {
  for (let i = 0; i <= array.length; i++) {
    if (array[i].mac == mac) {
      return array[i];
    }
  }
  return false
}

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
        const res = await axios.get(url);
        const data = res.data;
        
        resolve(findItemInArray(data, mac));
      } catch(err) {
        reject(err.message)
      }
    })
  }
}

export default DeviceService;