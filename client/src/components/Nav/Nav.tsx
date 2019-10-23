import React, {
  Fragment,
  ReactPropTypes,
  FC,
  ReactComponentElement
} from "react";
import { Link } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";

import { User } from "../../GlobalTypes/globaltypes";

import "./Nav.css";

interface NavProps extends ReactPropTypes {
  user: User;
  // logout: ()
}

const Nav: FC<NavProps> = props => {
  let greeting;

  if (props.user === null) {
    greeting = <p>Hello guest</p>;
  } else if (props.user.firstName) {
    greeting = (
      <Fragment>
        Welcome back, <strong>{props.user.firstName}</strong>
      </Fragment>
    );
  } else if (props.user.username) {
    greeting = (
      <Fragment>
        Welcome back, <strong>{props.user.username} </strong>
      </Fragment>
    );
  }

  return (
    <Navbar bg="lightblue">
      <Navbar.Brand href="#home">
        <img
          src="https://images.vexels.com/media/users/3/135811/isolated/preview/f3dc1094d770aadce0dff261623fddb6-dices-3d-icon-by-vexels.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        <Link to="/">Yahtzee</Link>
      </Navbar.Brand>
      <Nav>
        <Navbar.Text>{greeting} - </Navbar.Text>
        <Link to="#" className="logout">
          Logout
        </Link>
      </Nav>
    </Navbar>
  );
};

export default Nav;
