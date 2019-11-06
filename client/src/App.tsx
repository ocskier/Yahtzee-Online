import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from './components/Nav';
import Yahtzee from './pages/Yahtzee';
import NoMatch from './pages/NoMatch';
import AUTH from './utils/AUTH';

interface Props {}

interface State {
  loggedIn: boolean;
  user: any;
  token: string;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: null,
      token: '',
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem('token');
    token &&
      AUTH.getUser({ token: token }).then(response => {
        console.log(response.data);
        if (!!response.data.user) {
          this.setState({
            loggedIn: true,
            user: response.data.user,
          });
        } else {
          this.setState({
            loggedIn: false,
            user: null,
          });
        }
      });
  }

  logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    this.setState(
      {
        loggedIn: false,
        user: null,
      },
      () => sessionStorage.removeItem('token'),
    );
  };

  login = (username: string, password: string) => {
    AUTH.login(username, password)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // update the state
          this.setState(
            {
              loggedIn: true,
              user: response.data.user,
            },
            () => sessionStorage.setItem('token', response.data.token),
          );
        }
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  };

  socialLogin = (userObj: any) => {
    userObj &&
      this.setState(
        {
          loggedIn: true,
          user: userObj.profile,
          token: userObj.token,
        },
        () => sessionStorage.setItem('token', this.state.token),
      );
  };

  render() {
    return (
      <div className="App">
        <Nav footer={false} user={this.state.user} logout={this.logout} />
        {this.state.loggedIn && (
          <div className="main-view">
            <Switch>
              <Route exact path="/" component={Yahtzee} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        )}
        {!this.state.loggedIn && (
          <div className="auth-wrapper" style={{ paddingTop: '6%' }}>
            <Switch>
              <Route exact path="/" component={() => <LoginForm login={this.login} socialLogin={this.socialLogin} />} />
              <Route exact path="/signup" component={SignupForm} />
            </Switch>
          </div>
        )}
        <Nav footer={true} />
      </div>
    );
  }
}

export default App;
