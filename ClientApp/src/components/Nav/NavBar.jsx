import React, { Component } from 'react';
import { Menu, Container, Button, Icon, Image } from 'semantic-ui-react';
import {Link, NavLink} from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <Image src='./assets/images/dj.png' size='mini'/>
          </Menu.Item>
          <Menu.Item as={NavLink} to='/browse' name="Browse" />
          <Menu.Item position="right">
            <Button basic inverted content="Login" />
            <Button
              basic
              inverted
              content="Sign Out"
              style={{ marginLeft: '0.5em' }}
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default NavBar;
