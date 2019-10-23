import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./pages/Auth/LoginForm";
import SignupForm from "./pages/Auth/SignupForm";
import Nav from "./components/Nav";
import Yahtzee from "./pages/Yahtzee";
import NoMatch from "./pages/NoMatch";
import AUTH from "./utils/AUTH";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: null
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token");
    AUTH.getUser({ token: token }).then(response => {
      console.log(response.data);
      if (!!response.data.user) {
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      } else {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  }

  logout = event => {
    event.preventDefault();
    this.setState(
      {
        loggedIn: false,
        user: null
      },
      () => sessionStorage.removeItem("token")
    );
  };

  login = (username, password) => {
    AUTH.login(username, password)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // update the state
          this.setState(
            {
              loggedIn: true,
              user: response.data.user
            },
            () => sessionStorage.setItem("token", response.data.token)
          );
        }
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  };

  render() {
    return (
      <div className="App">
        {this.state.loggedIn && (
          <div>
            <Nav user={this.state.user} logout={this.logout} />
            <div className="main-view">
              <Switch>
                <Route exact path="/" component={Yahtzee} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        )}
        {!this.state.loggedIn && (
          <div className="auth-wrapper" style={{ paddingTop: "6%" }}>
            <Route
              exact
              path="/"
              component={() => <LoginForm login={this.login} />}
            />
            <Route exact path="/signup" component={SignupForm} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
