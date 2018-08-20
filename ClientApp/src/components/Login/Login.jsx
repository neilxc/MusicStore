import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom';
import {Button, TextField, Typography} from '@material-ui/core';
import CenterPaper from '../Shared/CenterPaper';

class Login extends Component {
    state = {
        user: {
            email: '',
            password: ''
        }
    }
    // handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
    // handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
    // handleSubmitForm = (e) => {
    //     e.preventDefault();
    //     this.props.authStore.login()
    //         .then(() => this.props.history.replace('/'));
    // }

    handleInputChange = evt => {
        const user = {...this.state.user}
        user[evt.target.name] = evt.target.value;
        this.setState({
            user
        })
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        const payload = {
            user: this.state.user
        };
        fetch('http://localhost:5000/api/auth/login', {
            method: 'post',
            body: JSON.stringify(payload),
            headers: new Headers({
                'Content-Type': 'Application/json'
            }),
        }).then((response) => {
            return response.json();
        }).then((r) => {
            window.localStorage.setItem('token', r.user.token);
        })
    }

  render() {
      const {user} = this.state;
    return (
      <div style={{flexGrow: 1, marginTop: '1.125rem'}}>
        <CenterPaper>
            <Typography variant='headline' align='center' component='h1'>Log in</Typography>
            <div className="center">
                <Button component={Link} to='/register'>Need an account?</Button>
            </div>
            <form onSubmit={this.handleSubmitForm} className='center' style={{width: '50%', margin: 'auto'}}>
                <TextField
                    id='email'
                    label='Email'
                    required
                    name='email'
                    value={user.email}
                    error={false}
                    fullWidth
                    type='email'
                    onChange={this.handleInputChange}
                    margin='normal'
                />
                <TextField
                    id='password'
                    label='Password'
                    required
                    name='password'
                    value={user.password}
                    error={false}
                    fullWidth
                    type='password'
                    onChange={this.handleInputChange}
                    margin='normal'
                />
                <Button color='primary' type='submit' variant='raised'>
                    Sign in
                </Button>
            </form>
        </CenterPaper>
      </div>
    )
  }
}
export default withRouter(Login)
