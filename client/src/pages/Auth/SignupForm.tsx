import React, { FC, ChangeEvent, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';

import { useFirebaseAuth } from 'use-firebase-auth';

import './Auth.css';

interface Props {}

const SignupForm: FC<Props> = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [redirectTo, setRedirectTo] = useState('');

  const { createUserWithEmailAndPassword } = useFirebaseAuth();

  const handleChange = (event: ChangeEvent<{ name: string; value: unknown }>) => {
    const { name } = event.target;
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const { username, password } = formState;

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createUserWithEmailAndPassword(username, password);
    setRedirectTo('/');
  };

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />;
  }

  return (
    <div>
      <Card title="Lets Play Yahtzee!">
        <form style={{ marginTop: 10 }}>
          <label htmlFor="firstName">First name: </label>
          <Input type="text" name="firstName" value={formState.firstName} onChange={handleChange} />
          <label htmlFor="lastName">Last name: </label>
          <Input type="text" name="lastName" value={formState.lastName} onChange={handleChange} />
          <label htmlFor="username">Username: </label>
          <Input
            type="text"
            name="username"
            value={formState.username}
            required
            minLength="6"
            onChange={handleChange}
          />
          <label htmlFor="password">Password: </label>
          <Input
            type="password"
            name="password"
            value={formState.password}
            required
            minLength="8"
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <Input
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            required
            minLength="8"
            pattern={formState.password}
            onChange={handleChange}
          />
          <Link to="/">Login</Link>
          <FormBtn onClick={handleSubmit}>Register</FormBtn>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;
