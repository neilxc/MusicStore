import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import {inject, observer} from 'mobx-react';
import CenterPaper from '../Shared/CenterPaper';
import { Typography, TextField, Button } from '@material-ui/core';

export default class Register extends Component {
    // handleUsernameChange = (e) => this.props.authStore.setUsername(e.target.value);
    // handleEmailChange = (e) => this.props.authStore.setEmail(e.target.value);
    // handlePasswordChange = (e) => this.props.authStore.setPassword(e.target.value);
    // handleSubmitForm = (e) => {
    //     e.preventDefault();
    //     this.props.authStore.register()
    //         .then(() => this.props.history.replace('/'));
    // }

  render() {
    return (
      <div style={{flexGrow: 1, marginTop: '1.125rem'}}>
        <CenterPaper>
            <Typography variant='headline' align='center' component='h1'>
                Sign up
            </Typography>
            <div className="center">
                <Button component={Link} to='/login'>Have an account?</Button>
            </div>
            <form onSubmit={this.handleSubmitForm} className='center' style={{width: '50%', margin: 'auto'}}>
                <TextField
                    id='username'
                    label='Username'
                    required
                    fullWidth
                    type='text'
                    onChange={this.handleUsernameChange}
                    margin='normal'
                />
                <TextField
                    id='email'
                    label='Email'
                    required
                    fullWidth
                    type='email'
                    onChange={this.handleEmailChange}
                    margin='normal'
                />
                <TextField
                    id='password'
                    label='Password'
                    required
                    fullWidth
                    type='password'
                    onChange={this.handlePasswordChange}
                    margin='normal'
                />
                <Button color='primary' type='submit' variant='raised'>
                    Sign up
                </Button>
            </form>
        </CenterPaper>
      </div>
    )
  }
}
