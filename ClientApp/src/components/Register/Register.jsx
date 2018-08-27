import React from 'react';
import { Form, Segment, Button, Grid, Header } from 'semantic-ui-react';

const Register = () => {
  return (
    <Grid textAlign='center'>
      <Grid.Column width={8}>
          <Header as='h1' content='Sign in'/>
          <Form size="large">
          <Segment>
            <Form.Input label="Your email" type="text" placeholder='Email' />
            <Form.Input label="Your password" type="password" placeholder='Password' />

            <Button fluid size="large" color="pink">
              Login
            </Button>
            <Header subheader color='pink' content='Forgotten your password?'/>
          </Segment>
        </Form>
        
      </Grid.Column>
    </Grid>

  );
};

export default Register;