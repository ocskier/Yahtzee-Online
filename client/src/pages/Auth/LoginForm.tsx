import React, { FC, useState, MouseEvent } from 'react';
import { Redirect, Link } from 'react-router-dom';

// Import App Components
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';

import './Auth.css';

interface StyleTypes {
  socialDiv: any;
  buttonText: any;
  socialFab: any;
  facebookIcon: any;
  googleIcon: any;
}

const styleSheet: StyleTypes = {
  socialDiv: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonText: {
    display: 'inline-block',
    verticalAlign: 'middle',
    paddingLeft: '42px',
    paddingRight: '42px',
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: `'Roboto', sans-serif`,
  },
  socialFab: {
    display: 'inline-block',
    margin: '6px',
    whiteSpace: 'nowrap',
    background: 'white',
    color: '#444',
    width: 'auto',
    minWidth: '250px',
    borderRadius: '5px',
    border: 'thin solid #888',
    boxShadow: '1px 1px 1px grey',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#d5d5d5',
      transform: 'scale(1.05)',
    },
  },
  facebookIcon: {
    background: `url('/iconfinder_facebook_317746.png') transparent 5px 50% no-repeat`,
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '50px',
    height: '50px',
  },
  googleIcon: {
    background: `url('/icons8-google-48.png') transparent 5px 50% no-repeat`,
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '50px',
    height: '50px',
  },
};

interface LoginProps {
  login: (username: string, password: string) => void;
  socialLogin: (userObj: any) => void;
}

const LoginForm: FC<LoginProps> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState('');

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    console.log('handleSubmit');
    props.login(username, password);
  };

  const onFailureHandler = (error: any) => console.log(error);

  const onSuccessHandler = (data: any) => {
    data &&
      props.socialLogin({
        token: data.accessToken,
        socialId: data.googleId,
        profile: data.profileObj,
        tokenData: data.tokenObj,
      });
  };

  return (
    <>
      {redirectTo ? (
        <Redirect to={{ pathname: redirectTo }} />
      ) : (
        <Card title="Lets Play Yahtzee!">
          <div>
            <div style={styleSheet.socialFab} onClick={() => null}>
              <span style={styleSheet.googleIcon}></span>
              <span style={styleSheet.buttonText}>Login with Google</span>
            </div>
            <div style={styleSheet.socialFab} onClick={() => null}>
              <span style={styleSheet.facebookIcon}></span>
              <span style={styleSheet.buttonText}>Login with Facebook</span>
            </div>
          </div>
          <form style={{ marginTop: 10 }}>
            <label htmlFor="username">Username: </label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setUsername(event.target.value);
              }}
            />
            <label htmlFor="password">Password: </label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setPassword(event.target.value);
              }}
            />
            <Link to="/signup">Register</Link>
            <FormBtn onClick={handleSubmit}>Login</FormBtn>
          </form>
        </Card>
      )}
    </>
  );
};

export default LoginForm;
