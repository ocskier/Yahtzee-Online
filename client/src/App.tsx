import React, { FC, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useFirebaseAuth } from 'use-firebase-auth';
import { ToastContainer, toast } from 'react-toastify';
import ioClient from 'socket.io-client';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Yahtzee from './pages/Yahtzee';
import NoMatch from './pages/NoMatch';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';

const styles = {
  toast: {
    top: '20px',
    width: '25%',
  },
  error: {
    opacity: 0.3,
  },
  sidebarWrapper: {
    transition: 'margin .25s ease-out',
  },
  pageContentWrapper: {
    marginRight: '240px' /* Width of sidebar */,
    padding: 0,
  },
};

interface Props {}

const App: FC<Props> = () => {
  const [socket, setSocket] = useState({} as SocketIOClient.Socket);
  const [tweets, setTweets] = useState([] as any);
  const [endpoint] = useState('http://localhost:3001/');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const { user, error, signOut } = useFirebaseAuth();

  useEffect(() => {
    error &&
      toast.error('Authentication Error', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        onOpen: () => setIsToastOpen(true),
        onClose: () => setIsToastOpen(false),
      });
    user &&
      toast.success('Authentication Successful', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        onOpen: () => setIsToastOpen(true),
        onClose: () => setIsToastOpen(false),
      });
  }, [error, user]);

  useEffect(() => {
    setSocket(ioClient(process.env.NODE_ENV === 'production' ? window.location.hostname : endpoint));
  }, [endpoint]);

  useEffect(() => {
    if (Object.keys(socket).length !== 0) {
      socket.emit('data', 'ipa');
      socket.on('tweet', (data: any) => {
        console.log(data);
        setTweets((tweets: any[]) => [...tweets, data.id_str]);
      });
    }
  }, [socket]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        className="toasty"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={styles.toast}
      />
      <div className="App" style={isToastOpen ? styles.error : {}}>
        <Sidebar socket={socket} />
        <div style={styles.pageContentWrapper}>
          <Nav footer={false} user={user} signOut={signOut} />
          {user && (
            <div className="main-view container-fluid">
              <Switch>
                <Route exact path={['/', '/signup']} component={() => <Yahtzee tweets={tweets} />} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          )}
          {!user && (
            <div className="auth-wrapper">
              <Switch>
                <Route exact path="/" component={LoginForm} />
                <Route exact path="/signup" component={SignupForm} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          )}
          <Nav footer={true} />{' '}
        </div>
      </div>
    </>
  );
};

export default App;
