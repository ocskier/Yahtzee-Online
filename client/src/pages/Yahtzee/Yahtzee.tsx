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
    return (
      <>
        <Card style={{ width: '18rem', position: 'absolute', right: '5%', bottom: '15%' }}>
          <Card.Img
            variant="top"
            src="https://images.vexels.com/media/users/3/135811/isolated/preview/f3dc1094d770aadce0dff261623fddb6-dices-3d-icon-by-vexels.png"
          />
          <Card.Body>
            <Card.Title>Stream</Card.Title>
            <Card.Text>Players Chat Area</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            {this.state.tweets.map((tweet: any) => (
              <ListGroupItem>{tweet}</ListGroupItem>
            ))}
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Something</Card.Link>
            <Card.Link href="#">Chat</Card.Link>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Yahtzee;
