import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './components/Home';
import Login from './components/Login/Login';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import Header from './components/Header/Header';
import Register from './components/Register/Register';

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#0097a7',
      light: '#bdbdbd',
      main: '#2196f3'
  }
}});

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
      </MuiThemeProvider>

    );
  }
}
