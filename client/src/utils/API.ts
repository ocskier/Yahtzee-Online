import axios from 'axios';

export default {
  checkConnection: () => {
    return axios.get('/api');
  },
  createPlayer: (user: { uid: string; fullName: string }) => {
    return axios.post('/api/players', user);
  },
  getPlayers: () => {
    return axios.get('/api/players');
  },
};
