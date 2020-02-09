import React, { Component } from 'react';
import axios from 'axios';

import Profile from '../components/Profile';
import Shout from '../components/Shout';
import Grid from '@material-ui/core/Grid';

class home extends Component {
      state = {
            shouts: null
      };

      componentDidMount() {
            axios.get('/shouts')
                  .then(response => {
                        console.log(response.data);
                        this.setState({
                              shouts: response.data
                        });
                  })
                  .catch(err => {
                        console.log(err);
                  });
      }

      render() {
            const recentShoutsMarkup = this.state.shouts ? (
                  this.state.shouts.map(shout => {
                        return <Shout shout={shout} key={shout.shoutId}/>
                  })
            ) : (
                  <p>Loading...</p>
            );

            return (
                  <Grid container spacing={10}>
                        <Grid item sm={8} xs={12}>
                              {recentShoutsMarkup}
                        </Grid>
                        <Grid item sm={4} xs={12}>
                              <Profile/>
                        </Grid>
                  </Grid>
            )
      }
}

export default home
