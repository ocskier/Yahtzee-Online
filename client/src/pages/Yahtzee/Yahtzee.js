import React, { Component } from "react";
import { Link } from "react-router-dom";

import API from "../../utils/API";


class Yahtzee extends Component {
  state = {
    players: [],
    socket: {}
  };

  componentDidMount() {
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Yahtzee;
