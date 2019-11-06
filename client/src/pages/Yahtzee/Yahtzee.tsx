import React, { Component } from 'react';
// import { Link } from "react-router-dom";

import API from '../../utils/API';
import { AxiosResponse } from 'axios';

class Yahtzee extends Component {
  state = {
    players: [],
    socket: {},
  };

  componentDidMount() {
    API.checkConnection().then((res: AxiosResponse) => console.log(res));
  }

  render() {
    return <div></div>;
  }
}

export default Yahtzee;
