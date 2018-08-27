import React, { Component } from 'react'
import {observer, inject} from 'mobx-react';
import { Form, Segment, Button, Grid, Header } from 'semantic-ui-react';

@inject('authStore')
@observer
export default class Login extends Component {

  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.authStore.login()
      .then(() => console.log('login successful'));
  }

  render() {
    const {values, errors, inProgress} = this.props.authStore;
    return (
      <Grid textAlign='center'>
      <Grid.Column width={8}>
          <Header as='h1' content='Sign in'/>
          <Form size="large" onSubmit={this.handleSubmitForm}>
          <Segment>
            <Form.Input label="Your email" type="text" value={values.email} placeholder='Email' onChange={this.handleEmailChange} />
            <Form.Input label="Your password" type="password" value={values.password} placeholder='Password' onChange={this.handlePasswordChange} />

            <Button fluid size="large" color="pink">
              Login
            </Button>
            <Header sub color='pink' content='Forgotten your password?'/>
          </Segment>
        </Form>
        
      </Grid.Column>
    </Grid>
    )
  }
}
