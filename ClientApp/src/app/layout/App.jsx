import React, { Component, Fragment } from 'react';
import {inject, observer} from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router';
import Login from '../../components/Login/Login';
import NavBar from '../../components/Nav/NavBar';
import Register from '../../components/Register/Register';
import HomePage from '../../components/Home/HomePage';
import Albums from '../../components/Store/Albums';
import { Container } from 'semantic-ui-react';

@withRouter
@inject('commonStore', 'userStore')
@observer
export default class App extends Component {
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore
        .pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render() {
    return (
      <Fragment>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <NavBar />
              <Container className='main'>
                <Switch>
                  <Route exact path="/browse" component={Albums} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}
