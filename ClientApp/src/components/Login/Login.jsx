import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';

const Login = () => {
  return (
    <Form size="large">
      <Segment>
        <Form.Input label="email" type="text" placeholder='Email' />
        <Form.Input label="Password" type="password" placeholder='Password' />

        <Button fluid size="large" color="pink">
          Login
        </Button>
        <Divider horizontal>Or</Divider>
      </Segment>
    </Form>
  );
};

export default Login;