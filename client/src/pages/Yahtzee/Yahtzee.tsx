import React, { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useFirebaseAuth } from 'use-firebase-auth';

import { Button, Card, Container, Form, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

import API from '../../utils/API';

import './Yahtzee.css';

const styles = {
  socialCard: {
    margin: '0 auto',
    minHeight: '460px',
    width: '100%',
    height: 'fit-content',
  },
  socialContainer: {
    display: 'flex',
    padding: '2rem 0',
  },
  tweetList: {
    minHeight: '100px',
    overflow: 'scroll',
    flexDirection: 'column-reverse' as 'column-reverse',
  },
  yahtzeeContainer: {
    width: '100%',
    maxWidth: '1160px',
    background: 'white',
    minHeight: '626px',
    margin: '0',
    borderRadius: '5%',
    height: '100%',
    padding: '2rem',
    opacity: '0.2',
  },
};

function Yahtzee({ tweets }) {
  const [players, setPlayers] = useState([]);
  const [endpoint] = useState('http://localhost:3001/');
  const { user } = useFirebaseAuth();

  const getPlayers = async () => {
    const playerRes: AxiosResponse = await API.getPlayers();
    setPlayers(playerRes.data);
  };

  useEffect(() => {
    const checkConnection = async () => {
      const res: AxiosResponse = await API.checkConnection();
      console.log(res.data.msg);
      getPlayers();
    };
    checkConnection();
  }, []);

  return (
    <Container fluid className="section">
      <Row style={{ width: '100%' }}>
        <Col lg={3} style={styles.socialContainer}>
          <Card style={styles.socialCard}>
            <Card.Body>
              <Card.Title>Stream</Card.Title>
              {tweets.length > 0 && (
                <ListGroup className="list-group-flush" style={styles.tweetList}>
                  {tweets.map((tweet: any, i: number) => (
                    <TwitterTweetEmbed key={i} tweetId={tweet} />
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9} style={{ flexDirection: 'column' as 'column' }}>
          <img
            src="https://images.vexels.com/media/users/3/135811/isolated/preview/f3dc1094d770aadce0dff261623fddb6-dices-3d-icon-by-vexels.png"
            width="300"
            height="300"
            className="align-top mainlogo"
            alt="React Bootstrap logo"
            style={{ margin: '0 auto', display: 'block' }}
          />
          <Container style={styles.yahtzeeContainer}>
            {players.map((player) => (
              <p key={player._id}> {player.fullName}</p>
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Yahtzee;
