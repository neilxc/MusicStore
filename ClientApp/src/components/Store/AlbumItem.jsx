import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react';

const AlbumItem = ({album}) => {
  return (
    <Card>
      <Image src='/assets/images/placeholder.svg'/>
      <Card.Content>
          <Card.Header>{album.title}</Card.Header>
          <Card.Meta>
              <span>{album.artist.name}</span>
          </Card.Meta>
          <Card.Description>${album.price}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign='center'>
        <Button content='Add to basket' color='pink' basic/>
      </Card.Content>
    </Card>
  )
}

export default AlbumItem
