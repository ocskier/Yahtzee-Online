import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button, Card, Form, ListGroup, ListGroupItem, Nav } from 'react-bootstrap';
import { useFirebaseAuth } from 'use-firebase-auth';

const styles = {
  chatMsg: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '5px',
    marginBottom: '5px',
    fontSize: '0.6rem',
  },
  chatMsg2: {
    justifyContent: 'flex-end',
  },
  chatList: {
    padding: '0.2rem',
    border: 'solid 5px blue',
    display: 'flex',
    flexDirection: 'column' as 'column',
    overflow: 'scroll',
    maxHeight: '160px',
    height: '200px',
  },
  sidebar: {
    height: '100%',
    position: 'fixed' as 'fixed',
    zIndex: 1,
    top: 0,
    right: 0,
    backgroundColor: '#111' /* Disable horizontal scroll */,
    paddingTop: '20px',
  },
  sidebarWrapperHeader: {
    padding: '1.875rem 1.25rem',
    fontSize: '1.2rem',
  },
  socialCard: {
    margin: '0 auto',
    minHeight: '460px',
    width: '100%',
  },
  open: {
    width: '240px',
  },
  closed: {
    width: 0,
  },
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, socket }) => {
  const [incomingMsgs, setIncomingMsgs] = useState([] as any);
  const [outgoingMsg, setOutgoingMsg] = useState('');

  const { user } = useFirebaseAuth();

  useEffect(() => {
    if (Object.keys(socket).length !== 0) {
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

  const pressedEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let msg = outgoingMsg;
      socket && socket.emit('chat', msg, user);
      setOutgoingMsg('');
    }
  };

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

  return (
    <>
      <Nav
        className="d-md-block bg-light"
        style={isSidebarOpen ? { ...styles.sidebar, ...styles.open } : { ...styles.sidebar, ...styles.closed }}
        activeKey="/home"
      >
        <div className="sidebar-sticky"></div>
        <div style={styles.sidebarWrapperHeader}>
          <i onClick={() => setIsSidebarOpen(false)}>*</i>
        </div>
        <Nav.Item>
          <Nav.Link href="/">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/">Link</Nav.Link>
        </Nav.Item>
        <div style={styles.sidebarWrapperHeader}></div>
        <Card style={styles.socialCard}>
          <Card.Body>
            <Card.Title>Stream</Card.Title>
            <Card.Text>Players Chat Area</Card.Text>
          </Card.Body>
          <ListGroup id="chatBody" className="list-group-flush" style={styles.chatList}>
            {incomingMsgs.length > 0 &&
              incomingMsgs.map(
                (msg: any, i: number) =>
                  user && (
                    <ListGroupItem
                      key={i}
                      style={
                        user.uid === msg.senderInfo.uid ? styles.chatMsg : { ...styles.chatMsg, ...styles.chatMsg2 }
                      }
                    >
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
          </Card.Body>
        </Card>
      </Nav>
    </>
  );
};

export default Sidebar;
