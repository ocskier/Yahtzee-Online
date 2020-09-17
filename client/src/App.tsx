import React, { FC, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useFirebaseAuth } from 'use-firebase-auth';
import { ToastContainer, toast } from 'react-toastify';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from './components/Nav';
import Yahtzee from './pages/Yahtzee';
import NoMatch from './pages/NoMatch';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';

const styles = {
  toast: {
    top: "20px",
    width: "25%"
  },
  error: {
    opacity: 0.3
  }
}

interface Props {}

const App: FC<Props> = () => {
  const { user, error, signOut } = useFirebaseAuth();
  const [ isToastOpen, setIsToastOpen ] = useState(false);

  useEffect(()=>{
    error && toast.error('Authentication Error', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      onOpen: () => setIsToastOpen(true),
      onClose: () => setIsToastOpen(false)
      });
    user && toast.success('Authentication Successful', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      onOpen: () => setIsToastOpen(true),
      onClose: () => setIsToastOpen(false)
      });
  },[error, user]);

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
        <Nav footer={false} user={user} signOut={signOut} />
        {user && (
          <div className="main-view container-fluid">
            <Switch>
              <Route exact path={['/', '/signup']} component={Yahtzee} />
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
        <Nav footer={true} />
      </div>
    </>
  );
};

export default App;
