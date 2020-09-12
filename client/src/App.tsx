import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from './components/Nav';
import Yahtzee from './pages/Yahtzee';
import NoMatch from './pages/NoMatch';

interface Props {}

const App: FC<Props> = () => {
  const user = null;
  console.log(user);

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
  };

  const login = (username: string, password: string) => {
    //   console.log(response);
    //   if (response.status === 200) {
    //     // update the state
    //   }
    // })
    // .catch((err) => {
    //   console.log(err.response.data.message);
    // });
  };

  const socialLogin = (userObj: any) => {
    userObj && delete userObj.tokenData;
    // userObj &&
  };

  return (
    <div className="App">
      <Nav footer={false} {...user} logout={logout} />
      {user && (
        <div className="main-view">
          <Switch>
            <Route exact path="/" component={Yahtzee} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      )}
      {!user && (
        <div className="auth-wrapper" style={{ paddingTop: '6%' }}>
          <Switch>
            <Route exact path="/" component={() => <LoginForm login={login} socialLogin={socialLogin} />} />
            <Route exact path="/signup" component={SignupForm} />
          </Switch>
        </div>
      )}
      <Nav footer={true} />
    </div>
  );
};

export default App;
