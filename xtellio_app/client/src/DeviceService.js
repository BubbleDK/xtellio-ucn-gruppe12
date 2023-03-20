import axios from 'axios';

const url = 'http://localhost:5000/api/devices';

/* eslint-disable no-async-promise-executor */
class DeviceService {
  // Get Devices
  static getDevices() {
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


  // static async getDevices() {
  //   async function get() {
  //     try {
  //       const res = await axios.get(url);
  //       return res.data
  //     } catch(err) {
  //       console.error(err.message)
  //     }
  //   }

  //   get().then((data) => {
  //     console.log(data)
  //     return data
  //   })
  //}
}

export default DeviceService;