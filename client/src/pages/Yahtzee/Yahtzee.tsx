import React, { useEffect, useState, useCallback } from 'react';

import { AxiosResponse } from 'axios';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import ioClient from 'socket.io-client';
import { useFirebaseAuth } from 'use-firebase-auth';

import { Button, Card, Container, Form, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

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

function Yahtzee() {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState({} as SocketIOClient.Socket);
  const [incomingMsgs, setIncomingMsgs] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [outgoingMsg, setOutgoingMsg] = useState('');
  const [endpoint, setEndpoint] = useState(`http://localhost:3001/`);

  const { user } = useFirebaseAuth();

  useEffect(() => {
    setSocket(ioClient(process.env.NODE_ENV === 'production' ? window.location.hostname : endpoint));
  }, []);

  // componentWillUnmount() {
  //   this.state.socket && this.state.socket.close();
  // }

  const socketCb = useCallback(() => {
    console.log(socket);
    API.checkConnection().then((res: AxiosResponse) => console.log(res.data.msg));
    socket.emit('data', 'yahtzee');
    socket.on('tweet', (data: any) => {
      console.log(data);
      let tweetHistory: any = tweets;
      tweetHistory.unshift(data.id_str);
      setTweets(tweetHistory);
    });
    socket.on('chat', (msg: string, chatUser: any) => {
      console.log(incomingMsgs, tweets);
      let newMsgArr: any = incomingMsgs;
      console.log(newMsgArr);
      var messageBody = document.querySelector('#chatBody');
      messageBody!.scrollTop = messageBody!.scrollHeight - messageBody!.clientHeight;
      newMsgArr.push({
        senderInfo: chatUser,
        msgTxt: msg,
      });
      setIncomingMsgs(newMsgArr);
    });
  }, [socket]);

  const incomingMsgCb = useCallback(() => {
    const messageBody = document.querySelector('#chatBody');
    messageBody!.scrollTop = messageBody!.scrollHeight - messageBody!.clientHeight;
  }, [incomingMsgs]);

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let msg = outgoingMsg;
    socket && socket.emit('chat', msg, user);
    setOutgoingMsg('');
  };

  const pressedEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let msg = outgoingMsg;
      socket && socket.emit('chat', msg, user);
      setOutgoingMsg('');
    }
  };

  return (
    <Container
      fluid
      style={{
        marginTop: '-4rem',
        minHeight: 'calc(100vh - 112px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="https://images.vexels.com/media/users/3/135811/isolated/preview/f3dc1094d770aadce0dff261623fddb6-dices-3d-icon-by-vexels.png"
        width="300"
        height="300"
        className="d-inline-block align-top mainlogo"
        alt="React Bootstrap logo"
      />
      <Row style={{ width: '100%' }}>
        <Col md={9}>
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
        <Col md={3}>
          <Card style={{ margin: '40px auto 0', maxHeight: '660px', width: '100%' }}>
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
                flexDirection: 'column',
                overflow: 'scroll',
                maxHeight: '160px',
                height: '200px',
              }}
            >
              {incomingMsgs.length > 0 &&
                incomingMsgs.map(
                  (msg: any, i: number) =>
                    user && (
                      <ListGroupItem key={i} style={user.uid === msg.senderInfo._id ? styles.chatMsg : styles.chatMsg}>
                        {msg.senderInfo.givenName} - {msg.msgTxt}
                      </ListGroupItem>
                    ),
                )}
            </ListGroup>
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicInput">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    name="outgoingMsg"
                    value={outgoingMsg}
                    onChange={(e) => setOutgoingMsg(e.target.value)}
                    onKeyPress={pressedEnter}
                  />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={submitHandler}>
                Chat
              </Button>
            </Card.Body>
            <ListGroup
              className="list-group-flush"
              style={{ overflow: 'auto', minHeight: '100px', maxHeight: '425px' }}
            >
              {tweets &&
                tweets.map((tweet: any, i: number) => {
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
    </Container>
  );
}

export default Yahtzee;
