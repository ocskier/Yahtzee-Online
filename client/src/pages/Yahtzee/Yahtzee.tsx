import React, { Component } from 'react';
// import { Link } from "react-router-dom";

import { AxiosResponse } from 'axios';
import ioClient from 'socket.io-client';

import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

import { TwitterTweetEmbed } from 'react-twitter-embed';

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
        API.checkConnection().then((res: AxiosResponse) => console.log(res.data.msg));
        this.state.socket && this.state.socket.emit('data', 'yahtzee');
        this.state.socket &&
          this.state.socket.on('tweet', (data: any) => {
            console.log(data);
            let tweetHistory = this.state.tweets;
            tweetHistory.unshift(data.id_str);
            this.setState(prevState => ({
              ...prevState,
              tweets: tweetHistory,
            }));
          });
      },
    );
    //  this.state.socket.close();
  }

  componentWillUnmount() {
    this.state.socket && this.state.socket.close();
  }

  render() {
    return (
      <>
        <Container
          style={{
            width: '70%',
            maxWidth: '1160px',
            background: 'white',
            minHeight: '626px',
            margin: '40px',
            borderRadius: '5%',
          }}
        ></Container>
        <Card style={{ maxWidth: '20%', margin: '40px auto 0', maxHeight: '560px' }}>
          <Card.Img
            height={100}
            variant="top"
            src="https://images.vexels.com/media/users/3/135811/isolated/preview/f3dc1094d770aadce0dff261623fddb6-dices-3d-icon-by-vexels.png"
          />
          <Card.Body>
            <Card.Title>Stream</Card.Title>
            <Card.Text>Players Chat Area</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush" style={{ overflow: 'auto', maxHeight: '325px' }}>
            {this.state.tweets &&
              this.state.tweets.map((tweet: any, i: number) => {
                return (
                  <ListGroupItem key={i}>
                    <TwitterTweetEmbed tweetId={tweet} />
                  </ListGroupItem>
                );
              })}
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
