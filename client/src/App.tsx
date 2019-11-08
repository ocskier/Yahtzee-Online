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
  // token: string;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: null,
      // token: '',
    };
  }

  componentDidMount() {
    let user = JSON.parse(sessionStorage.getItem('user_data') || '{}');
    if (Object.keys(user).length === 0 && user.constructor === Object) {
      user = null;
    }
    console.log(user);
    user &&
      this.setState({
        loggedIn: true,
        user: user.profile,
        // token: user.token,
      });
    // AUTH.getUser({ token: token }).then(response => {
    //   console.log(response.data);
    //   if (!!response.data.user) {
    //     this.setState({
    //       loggedIn: true,
    //       user: response.data.user,
    //     });
    //   } else {
    //     this.setState({
    //       loggedIn: false,
    //       user: null,
    //     });
    //   }
    // });
  }

  logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    this.setState(
      {
        loggedIn: false,
        user: null,
      },
      () => sessionStorage.removeItem('user_data'),
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
    userObj && delete userObj.tokenData;
    userObj &&
      this.setState(
        {
          loggedIn: true,
          user: userObj.profile,
          // token: userObj.token,
        },
        () => sessionStorage.setItem('user_data', JSON.stringify(userObj)),
      );
  };

  render() {
    return (
      <div className="App">
        <Nav footer={false} {...this.state} logout={this.logout} />
        {this.state.loggedIn && (
          <div className="main-view container-fluid">
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
              <Route component={NoMatch} />
            </Switch>
          </div>
        )}
        <Nav footer={true} />
      </div>
    );
  }
}

export default App;
