import React, { Component } from 'react';
// import { Link } from "react-router-dom";

import { AxiosResponse } from 'axios';
import ioClient from 'socket.io-client';

import { Button, Card, Container, Form, ListGroup, ListGroupItem } from 'react-bootstrap';

import { Row, Col } from '../../components/Grid';

import { TwitterTweetEmbed } from 'react-twitter-embed';

import API from '../../utils/API';

const styles = {
  chatMsg: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '5px',
    marginBottom: '5px',
  },
  chatMsg2: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '5px',
    marginBottom: '5px',
  },
};

interface YProps {
  user: any;
}

interface YState {
  players: Array<any>;
  socket: SocketIOClient.Socket | null;
  incomingMsgs: Array<any>;
  tweets: Array<any>;
  endpoint: string;
  outgoingMsg: string;
}

class Yahtzee extends Component<YProps, YState> {
  state: YState = {
    players: [],
    socket: null,
    incomingMsgs: [],
    tweets: [],
    outgoingMsg: '',
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
          }) &&
          this.state.socket.on('chat', (msg: string, chatUser: any) => {
            console.log(this.state);
            let newMsgArr = this.state.incomingMsgs;
            console.log(newMsgArr);
            var messageBody = document.querySelector('#chatBody');
            messageBody!.scrollTop = messageBody!.scrollHeight - messageBody!.clientHeight;
            newMsgArr.push({
              senderInfo: chatUser,
              msgTxt: msg,
            });
            this.setState(
              {
                incomingMsgs: newMsgArr,
              },
              () => console.log(this.state),
            );
          });
      },
    );
    //  this.state.socket.close();
  }

  componentWillUnmount() {
    this.state.socket && this.state.socket.close();
  }

  handleChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let msg = this.state.outgoingMsg;
    this.setState(
      {
        outgoingMsg: '',
      },
      () => this.state.socket && this.state.socket.emit('chat', msg, this.props.user),
    );
  };

  render() {
    return (
      <Row>
        <Col size={'9'}>
          <Container
            style={{
              width: '80%',
              maxWidth: '1160px',
              background: 'white',
              minHeight: '626px',
              margin: '40px',
              borderRadius: '5%',
            }}
          ></Container>
        </Col>
        <Col size={'3'}>
          <Card style={{ margin: '40px auto 0', maxHeight: '660px', width: '90%' }}>
            <Card.Img
              height={100}
              variant="top"
              src="https://images.vexels.com/media/users/3/135811/isolated/preview/f3dc1094d770aadce0dff261623fddb6-dices-3d-icon-by-vexels.png"
            />
            <Card.Body>
              <Card.Title>Stream</Card.Title>
              <Card.Text>Players Chat Area</Card.Text>
            </Card.Body>
            <ListGroup
              id="chatBody"
              className="list-group-flush"
              style={{
                padding: 30,
                border: 'solid 5px blue',
                display: 'flex',
                flexDirection: 'column-reverse',
                overflow: 'scroll',
                maxHeight: '160px',
                height: '200px',
              }}
            >
              {this.state.incomingMsgs.length > 0 &&
                this.state.incomingMsgs.map((msg: any, i: number) => (
                  <ListGroupItem
                    key={i}
                    style={this.props.user._id === msg.senderInfo._id ? styles.chatMsg : styles.chatMsg}
                  >
                    {msg.senderInfo.givenName} - {msg.msgTxt}
                  </ListGroupItem>
                ))}
            </ListGroup>
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicInput">
                  <Form.Label>Message</Form.Label>
                  <Form.Control name="outgoingMsg" value={this.state.outgoingMsg} onChange={this.handleChange} />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={this.submitHandler}>
                Chat
              </Button>
            </Card.Body>
            <ListGroup
              className="list-group-flush"
              style={{ overflow: 'auto', minHeight: '100px', maxHeight: '425px' }}
            >
              {this.state.tweets &&
                this.state.tweets.map((tweet: any, i: number) => {
                  return (
                    <ListGroupItem key={i}>
                      <TwitterTweetEmbed tweetId={tweet} />
                    </ListGroupItem>
                  );
                })}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Yahtzee;
