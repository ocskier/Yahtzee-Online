import React, {
  Component,
  ReactPropTypes,
  ReactEventHandler,
  ChangeEvent
} from "react";
import { Redirect, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import  FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from "react-facebook-login";

// Import App Components
import { Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import { Input, FormBtn } from "../../components/Form";

import "./Auth.css";

interface LoginProps extends ReactPropTypes {
  login: (username: string, jpassword: string) => void;
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
      username: "",
      password: "",
      redirectTo: null
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    console.log("handleSubmit");
    this.props.login(this.state.username, this.state.password);
    // this.setState({
    // 	redirectTo: '/'
    // });
  };

  responseFacebook = (response: ReactFacebookLoginInfo| ReactFacebookFailureResponse => {
    console.log(response);
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <Container>
          <Card className="card" title="Lets Play Yahtzee!">
            <GoogleLogin
              clientId="861473397675-0ci55ekv78thhu1o408ig91qo2dl2bcq.apps.googleusercontent.com"
              onSuccess={onSuccessHandler}
              onFailure={onFailureHandler}
              cookiePolicy={"single_host_origin"}
              buttonText="Login"
              // render={renderProps => (
              //     <div
              //         className={classnames(classes.socialFab, classes.button)}
              //         onClick={renderProps.onClick}
              //     >
              //         <span className={classes.googleIcon}></span>
              //         <span className={classes.buttonText}>Login with Google</span>
              //     </div>
              // )}
            />
            <FacebookLogin
              appId="2571464129607396"
              callback={callbackFacebookLogin}
              fields="name,email,picture"
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
              // render={(renderProps: any) => (
              //     <div
              //         className={classnames(classes.socialFab, classes.button)}
              //         onClick={renderProps.onClick}
              //     >
              //         <span className={classes.facebookIcon}></span>
              //         <span className={classes.buttonText}>Login with Facebook</span>
              //     </div>
              // )}
            />
            <form style={{ marginTop: 10 }}>
              <label htmlFor="username">Username: </label>
              <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password: </label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Link to="/signup">Register</Link>
              <FormBtn onClick={this.handleSubmit}>Login</FormBtn>
            </form>
          </Card>
        </Container>
      );
    }
  }
}

export default LoginForm;
