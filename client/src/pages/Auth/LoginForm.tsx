import React, { Component, MouseEvent } from 'react';
import { Redirect, Link } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// Import App Components
import { Container } from '../../components/Grid';
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

interface LoginState {
  username: string;
  password: string;
  redirectTo: string | null;
}

class LoginForm extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      username: '',
      password: '',
      redirectTo: null,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    console.log('handleSubmit');
    this.props.login(this.state.username, this.state.password);
    // this.setState({
    // 	redirectTo: '/'
    // });
  };

  onFailureHandler = (error: any) => console.log(error);

  onSuccessHandler = (data: any) => {
    data &&
      this.props.socialLogin({
        token: data.accessToken,
        socialId: data.googleId,
        profile: data.profileObj,
        tokenData: data.tokenObj,
      });
  };

  responseFacebook = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    console.log(response);
  };

  render() {
    return (
      <Container>
        {this.state.redirectTo ? (
          <Redirect to={{ pathname: this.state.redirectTo }} />
        ) : (
          <Card title="Lets Play Yahtzee!">
            <div>
              <GoogleLogin
                clientId="861473397675-0ci55ekv78thhu1o408ig91qo2dl2bcq.apps.googleusercontent.com"
                onSuccess={this.onSuccessHandler}
                onFailure={this.onFailureHandler}
                cookiePolicy={'single_host_origin'}
                buttonText="Login"
                render={renderProps => (
                  <div style={styleSheet.socialFab} onClick={renderProps.onClick}>
                    <span style={styleSheet.googleIcon}></span>
                    <span style={styleSheet.buttonText}>Login with Google</span>
                  </div>
                )}
              />
              <FacebookLogin
                appId="2571464129607396"
                callback={this.responseFacebook}
                cssClass="my-facebook-button-class"
                fields="name,email,picture"
                render={(renderProps: any) => (
                  <div style={styleSheet.socialFab} onClick={renderProps.onClick}>
                    <span style={styleSheet.facebookIcon}></span>
                    <span style={styleSheet.buttonText}>Login with Facebook</span>
                  </div>
                )}
              />
            </div>
            <form style={{ marginTop: 10 }}>
              <label htmlFor="username">Username: </label>
              <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
              <label htmlFor="password">Password: </label>
              <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
              <Link to="/signup">Register</Link>
              <FormBtn onClick={this.handleSubmit}>Login</FormBtn>
            </form>
          </Card>
        )}
      </Container>
    );
  }
}

export default LoginForm;
