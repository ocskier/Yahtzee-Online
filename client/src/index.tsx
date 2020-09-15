import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseAuthProvider } from 'use-firebase-auth';
import firebase from 'firebase/app';
import { firebaseConfig } from './config';
import 'firebase/auth';

import './index.css';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

console.log(process.env);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <FirebaseAuthProvider firebase={firebase}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseAuthProvider>,
  document.getElementById('root'),
);
