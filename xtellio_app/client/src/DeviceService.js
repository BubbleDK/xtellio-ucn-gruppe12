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

  static Test() {
    const url = 'https://admin.xtellio.com/web/devices';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQwNzQ5OEB1Y24uZGsiLCJ0aWQiOiJMYWdlciBYdGVsOmFhYmRiMzI4NmQ4NDQ3ZWFhZWFlOTQ0YTdlMTNkZGZmIiwiYXVkIjoic2VydmVyOnRva2VuIn0.n1wKPHnk6Aue8ZJEHnlOTHCHBQ2BwpL0OeQqDjtwDxc';

    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      // handle error
    });
  }
}

export default DeviceService;