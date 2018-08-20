import {Grid, Paper} from '@material-ui/core';
import React, { Component } from 'react'
import './CenterPaper.css'

export default class CenterPaper extends Component {
  render() {
    return (
      <div style={{ flexGrow: 1, marginTop: '1.125rem'}}>
        <Grid container spacing={24}>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <Paper className='paper-container' elevation={24}>
                    {this.props.children}
                </Paper>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
      </div>
    )
  }
}
