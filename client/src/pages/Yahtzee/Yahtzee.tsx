import React, { Component } from 'react';
// import { Link } from "react-router-dom";

import { AxiosResponse } from 'axios';
import ioClient from 'socket.io-client';

import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

import API from '../../utils/API';

interface YState {
  players: Array<any>;
  socket: SocketIOClient.Socket | null;
  tweets: Array<any>;
  endpoint: string;
}

class Yahtzee extends Component<YState> {
  state: YState = {
    players: [],
    socket: null,
    tweets: [],
    endpoint: `http://localhost:3001/`,
  };

  componentDidMount() {
    this.setState(
      {
        socket: ioClient(process.env.NODE_ENV === 'production' ? window.location.hostname : this.state.endpoint),
      },
      () => {
        console.log(this.state.socket);
        API.checkConnection().then((res: AxiosResponse) => console.log(res));
        this.state.socket && this.state.socket.emit('data', 'Yahtzee');
        this.state.socket &&
          this.state.socket.on('tweet', (data: any) => {
            let tweetHistory = this.state.tweets;
            this.setState(
              prevState => ({
                ...prevState,
                tweets: tweetHistory.push(data.text),
              }),
              () => console.log(this.state.tweets),
            );
          });
      },
    );
    //  this.state.socket.close();
  }

  render() {
    return <div></div>;
  }
}

export default Yahtzee;
