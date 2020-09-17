import axios from 'axios';

export default {
  checkConnection: () => {
    return axios.get('/api');
  },
  createPlayer: (user) => {
    return axios.post('/api/player');
  },
};
