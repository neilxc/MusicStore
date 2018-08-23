import React, { Component } from 'react'
import { Header, Segment, List, Checkbox } from 'semantic-ui-react'

export default class Sidebar extends Component {
  state = {
    genres: []
  }

  componentWillMount() {
    fetch('http://localhost:5000/api/store/genres', {
      method: 'get',
      headers: new Headers({
        'Content-type': 'Application/json'
      }),
    }).then((response) => {
      return response.json();
    }).then((r) => {
      this.setState({
        genres: r.genres
      })
    })
  } 

  render() {
    const {genres} = this.state;
    return (
      <div>
      <Header attached='top' content='Genre'/>
      <Segment attached>
        <List divided relaxed verticalAlign='middle'>
            {genres && genres.map((genre) => (
              <List.Item key={genre.id}><Checkbox label={genre.name}/></List.Item>
            ))}
        </List>
      </Segment>
      
    </div>
    )
  }
}

