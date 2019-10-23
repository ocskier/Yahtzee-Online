import axios from "axios";

export default {
  // Gets user info
  getUser: function(tokenData) {
    return axios.post('/auth/user', tokenData);
  },
  // Logs the user out
  logout: function() {
    return axios.post('/auth/logout');
  },
  // Log the user in
  login: function(username, password) {
    return axios.post('/auth/login', { username, password });
  },
  // New user registration
  signup: function(userData) {
    return axios.post('/auth/signup', userData);
  }
};
