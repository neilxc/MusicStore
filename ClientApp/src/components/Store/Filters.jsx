import React from 'react'
import { Segment, Form, Button, Dropdown, Icon } from 'semantic-ui-react';

const Filters = () => {
  return (
    <Segment>
      <Form>
          <Form.Group inline style={{marginBottom: '0'}}>
            <label>View Type:</label>
            <Button basic icon active><Icon name='th' color='pink' /></Button>
            <Button basic icon><Icon name='list' color='pink' /></Button>
            <label>Products per page:</label>
            <Dropdown selection defaultValue='12' options={
                    [{key: '12', value: '12', text: '12'},
                    {key: '24', value: '24', text: '24'}]
                }/>
            <label>Sort by:</label>
            <Dropdown selection defaultValue='relevance' options={
                [{key: '1', value: 'relevance', text: 'Relevance'},
                {key: '2', value: 'release', text: 'Release date'}]
            }
            />
            <Button basic color='pink' content='Apply' style={{marginLeft: '0.5rem'}}/>
          </Form.Group>
      </Form>
    </Segment>
  )
}

export default Filters
