import React, { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import ioClient from 'socket.io-client';
import { useFirebaseAuth } from 'use-firebase-auth';

import { Button, Card, Container, Form, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

import API from '../../utils/API';

import './Yahtzee.css';

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
}

function Yahtzee() {
  // const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState({} as SocketIOClient.Socket);
  const [incomingMsgs, setIncomingMsgs] = useState([] as any);
  const [tweets, setTweets] = useState([] as any);
  const [outgoingMsg, setOutgoingMsg] = useState('');
  const [endpoint] = useState('http://localhost:3001/');
  const { user } = useFirebaseAuth();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const res: AxiosResponse = await API.checkConnection();
    console.log(res.data.msg);
    setSocket(ioClient(process.env.NODE_ENV === 'production' ? window.location.hostname : endpoint));
  }

  useEffect(() => {
    if (Object.keys(socket).length !== 0) {
      socket.emit('data', 'yahtzee');
      socket.on('tweet', (data: any) => {
        console.log(data);
        setTweets((tweets: any[]) => [...tweets, data.id_str]);
      });
      socket.on('chat', (msg: string, chatUser: any) => {
        var messageBody = document.querySelector('#chatBody');
        messageBody!.scrollTop = messageBody!.scrollHeight - messageBody!.clientHeight;
        setIncomingMsgs((incomingMsgs: any[]) => [
          ...incomingMsgs,
          {
            senderInfo: chatUser,
            msgTxt: msg,
          },
        ]);
      });
    }
  }, [socket]);

  useEffect(() => {
    const messageBody = document.querySelector('#chatBody');
    messageBody!.scrollTop = messageBody!.scrollHeight - messageBody!.clientHeight;
  }, [incomingMsgs]);

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let msg = outgoingMsg;
    socket &&
      user &&
      socket.emit('chat', msg, {
        uid: user.uid,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
      });
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
        height: '100%',
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
        <Col lg={9}>
          <Container
            style={{
              width: '100%',
              maxWidth: '1160px',
              background: 'white',
              minHeight: '626px',
              margin: '0',
              borderRadius: '5%',
              height: '100%',
            }}
          ></Container>
        </Col>
        <Col lg={3} style = {{display: 'flex',alignItems: 'center',padding: '2rem 0'}}>
          <Card style={{ margin: '0 auto', minHeight: '460px', width: '100%' }}>
            <Card.Body>
              <Card.Title>Stream</Card.Title>
              <Card.Text>Players Chat Area</Card.Text>
            </Card.Body>
            <ListGroup
              id="chatBody"
              className="list-group-flush"
              style={{
                padding: '0.2rem',
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
                      <ListGroupItem key={i} style={user.uid === msg.senderInfo.uid ? styles.chatMsg : styles.chatMsg}>
                        {msg.senderInfo.displayName} - {msg.msgTxt}
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
              {tweets.length > 0 && (
                <ListGroup
                  className="list-group-flush"
                  style={{ minHeight: '100px', overflow: 'scroll', flexDirection: 'column-reverse' }}
                >
                  {tweets.map((tweet: any, i: number) => (
                    <TwitterTweetEmbed key={i} tweetId={tweet} />
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Yahtzee;
