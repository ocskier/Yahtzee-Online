import axios from 'axios';

export default {
  // Gets user info
  getUser: function(tokenData: { token: string }) {
    return axios.post('/auth/user', tokenData);
  },
  // Logs the user out
  logout: function() {
    return axios.post('/auth/logout');
  },
  // Log the user in
  login: function(username: string, password: string) {
    return axios.post('/auth/login', { username, password });
  },
  // New user registration
  signup: function(userData: { firstName: string; lastName: string; username: string; password: string }) {
    return axios.post('/auth/signup', userData);
  },
  socialLogin: (token: string, service: string) => {
    return axios.post(`/auth/${service}?token=${token}`);
  },
};
