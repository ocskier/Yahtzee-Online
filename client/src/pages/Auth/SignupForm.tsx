import React, { Component, ChangeEvent } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import AUTH from '../../utils/AUTH';

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

class SignupForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      redirectTo: null,
    };
  }

  handleChange = (event: ChangeEvent<{ name: string; value: unknown }>) => {
    const { name } = event.target;
    this.setState((prevState: State) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    // TODO - validate!
    AUTH.signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
    }).then((response: AxiosResponse) => {
      console.log(response);
      if (!response.data.error) {
        console.log('youre good');
        this.setState({
          redirectTo: '/',
        });
      } else {
        console.log('duplicate');
      }
    });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }

    return (
      <Container>
        <Card title="Lets Play Yahtzee!">
          <form style={{ minWidth: '325px', marginTop: 10 }}>
            <label htmlFor="username">First name: </label>
            <Input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
            <label htmlFor="username">Last name: </label>
            <Input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
            <label htmlFor="username">Username: </label>
            <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
            <label htmlFor="password">Password: </label>
            <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <Input
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <Link to="/">Login</Link>
            <FormBtn onClick={this.handleSubmit}>Register</FormBtn>
          </form>
        </Card>
      </Container>
    );
  }
}

export default SignupForm;
