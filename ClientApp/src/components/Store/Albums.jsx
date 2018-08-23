import React, { Component } from 'react'
import { Grid, Card } from 'semantic-ui-react';
import Sidebar from './Sidebar';
import Filters from './Filters';
import AlbumItem from './AlbumItem';

export default class Albums extends Component {
  state = {
    albums: []
  }

  componentWillMount() {
    fetch('http://localhost:5000/api/store/albums', {
      method: 'get',
      headers: new Headers({
        'Content-type': 'Application/json'
      }),
    }).then((response) => {
      return response.json();
    }).then((r) => {
      this.setState({
        albums: r.albums
      })
    })
  }

  render() {
    const {albums} = this.state;
    return (
      <Grid>
        <Grid.Column width={3}>
            <Sidebar/>
        </Grid.Column>
        <Grid.Column width={13}>
            <Filters/>
            <Card.Group itemsPerRow={4}>
              {albums && albums.map((album) => (
                <AlbumItem key={album.id} album={album}/>
              ))}
            </Card.Group>
        </Grid.Column>
      </Grid>
    )
  }
}
