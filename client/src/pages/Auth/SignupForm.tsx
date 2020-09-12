import React, { FC, ChangeEvent, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';

import { AxiosResponse } from 'axios';

import './Auth.css';

interface Props {}
interface State {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  redirectTo: string | null;
}

const SignupForm: FC<Props> = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [redirectTo, setRedirectTo] = useState('');

  const handleChange = (event: ChangeEvent<{ name: string; value: unknown }>) => {
    const { name } = event.target;
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    // TODO - validate!
    // ({
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   username: this.state.username,
    //   password: this.state.password,
    // })
    // if (!response.data.error) {
    //   console.log('youre good');
    //   this.setState({
    //     redirectTo: '/',
    //   });
    // } else {
    //   console.log('duplicate');
    // }
  };

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />;
  }

  return (
    <div>
      <Card title="Lets Play Yahtzee!">
        <form style={{ marginTop: 10 }}>
          <label htmlFor="username">First name: </label>
          <Input type="text" name="firstName" value={formState.firstName} onChange={handleChange} />
          <label htmlFor="username">Last name: </label>
          <Input type="text" name="lastName" value={formState.lastName} onChange={handleChange} />
          <label htmlFor="username">Username: </label>
          <Input type="text" name="username" value={formState.username} onChange={handleChange} />
          <label htmlFor="password">Password: </label>
          <Input type="password" name="password" value={formState.password} onChange={handleChange} />
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <Input type="password" name="confirmPassword" value={formState.confirmPassword} onChange={handleChange} />
          <Link to="/">Login</Link>
          <FormBtn onClick={handleSubmit}>Register</FormBtn>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;
