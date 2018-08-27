import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react';
import {Link, NavLink, withRouter} from 'react-router-dom';

@withRouter
@inject('userStore', 'authStore')
@observer
class NavBar extends Component {

  handleSignOut = () => {
    this.props.authStore.logout();
  }

  render() {
    const isLoggedIn = !!this.props.userStore.currentUser;
    const {currentUser} = this.props.userStore;
    console.log(isLoggedIn);
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <Image src='./assets/images/dj.png' size='mini'/>
          </Menu.Item>
          <Menu.Item as={NavLink} to='/browse' name="Browse" />
          {!isLoggedIn &&
              <Menu.Item position="right">
                <Button as={Link} to='/login' basic inverted content="Login" />
                <Button
                  basic
                  inverted
                  content="Register"
                  style={{ marginLeft: '0.5em' }}
                />
            </Menu.Item>
          }
          {isLoggedIn &&
                <Menu.Item position="right">
                <Image avatar spaced="right" src={"/assets/images/user.png"} />
                <Dropdown pointing="top left" text={currentUser.userName}>
                  <Dropdown.Menu>
                    <Dropdown.Item text="Create Event" icon="plus" />
                    <Dropdown.Item text="My Events" icon="calendar" />
                    <Dropdown.Item text="My Network" icon="users" />
                    <Dropdown.Item text="My Profile" icon="user" />
                    <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
                    <Dropdown.Item onClick={this.handleSignOut} text="Sign Out" icon="power" />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
          }

        </Container>
      </Menu>
    );
  }
}

export default NavBar;
