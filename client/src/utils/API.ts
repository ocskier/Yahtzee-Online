import axios from 'axios';

export default {
  checkConnection: () => {
    return axios.get('/api');
  },
};
