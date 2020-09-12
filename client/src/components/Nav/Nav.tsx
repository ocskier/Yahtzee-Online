import React, { Fragment, FC } from 'react';
import { Link } from 'react-router-dom';

import { Nav, Navbar } from 'react-bootstrap';

import { User } from '../../GlobalTypes/globaltypes';

import './Nav.css';

interface NavProps {
  footer: boolean | undefined;
  loggedIn?: boolean;
  user?: any | null;
  logout?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const NavBar: FC<NavProps> = (props) => {
  let greeting;

  if (!props.user) {
    greeting = <p>Hello guest</p>;
  } else if (props.user && props.user.displayName) {
    greeting = (
      <Fragment>
        Welcome back, <strong>{props.user.displayName}</strong>
      </Fragment>
    );
  }

  return (
    <Navbar
      fixed={props.footer ? 'bottom' : undefined}
      bg="light"
      className={props.footer ? 'justify-content-around' : 'justify-content-between'}
    >
      {!props.footer && (
        <>
          <Navbar.Brand href="/">
            <img
              src="https://images.vexels.com/media/users/3/135811/isolated/preview/f3dc1094d770aadce0dff261623fddb6-dices-3d-icon-by-vexels.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <span className="brandText">Yahtzee</span>
          </Navbar.Brand>
          <Nav className="flex-column">
            <Navbar.Text>{greeting}</Navbar.Text>
            <Link onClick={props.logout} to="/" className="logout">
              {props.user ? 'Logout' : 'Login'}
            </Link>
          </Nav>
        </>
      )}
      {props.footer && (
        <Navbar.Brand href="/">
          <span className="brandText">Copyright</span>
        </Navbar.Brand>
      )}
    </Navbar>
  );
};

export default NavBar;
