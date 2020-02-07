import React, { Component } from 'react';
import Shout from '../components/Shout';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
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
                              <p>Profile...</p>
                        </Grid>
                  </Grid>
            )
      }
}

export default home
