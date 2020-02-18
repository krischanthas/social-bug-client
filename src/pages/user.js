import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Shout from "../components/shout/Shout";
import StaticProfile from "../components/profile/StaticProfile";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserProfile } from "../redux/actions/dataActions";

class user extends Component {
      state = {
            profile: null
      };
      componentDidMount() {
            const userName = this.props.match.params.handle;
            this.props.getUserProfile(userName);
            axios.get(`/users/${userName}`)
                  .then(res => {
                        this.setState({ profile: res.data.user });
                  })
                  .catch(err => {
                        console.log(err);
                  });
      }
      render() {
            const { shouts, loading } = this.props.data;
            const recentShoutsMarkup = loading ? (
                  <p>Loading data...</p>
            ) : shouts === null ? (
                  <p>No recent post from this user...</p>
            ) : (
                  shouts.map(shout => (
                        <Shout key={shout.shoutId} shout={shout} />
                  ))
            );
            return (
                  <Grid container spacing={10}>
                        <Grid item sm={4} xs={12}>
                              {this.state.profile === null ? (
                                    <p>Loading...</p>
                              ) : (
                                    <StaticProfile
                                          profile={this.state.profile}
                                    />
                              )}
                        </Grid>
                        <Grid item sm={8} xs={12}>
                              {recentShoutsMarkup}
                        </Grid>
                  </Grid>
            );
      }
}

user.propTypes = {
      getUserProfile: PropTypes.func.isRequired,
      data: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
      data: state.data
});
export default connect(mapStateToProps, { getUserProfile })(user);
