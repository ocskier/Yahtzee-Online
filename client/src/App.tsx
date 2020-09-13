import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useFirebaseAuth } from 'use-firebase-auth';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from './components/Nav';
import Yahtzee from './pages/Yahtzee';
import NoMatch from './pages/NoMatch';

interface Props {}

const App: FC<Props> = () => {
  const { user, signOut } = useFirebaseAuth();
  console.log(user);

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    user && signOut();
  };

  return (
    <div className="App">
      <Nav footer={false} user={user} logout={logout} />
      {user && (
        <div className="main-view">
          <Switch>
            <Route exact path={['/', 'signup']} component={Yahtzee} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      )}
      {!user && (
        <div className="auth-wrapper">
          <Switch>
            <Route exact path="/" component={() => <LoginForm />} />
            <Route exact path="/signup" component={SignupForm} />
          </Switch>
        </div>
      )}
      <Nav footer={true} />
    </div>
  );
};

export default App;
