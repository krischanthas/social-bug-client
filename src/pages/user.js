import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Shout from "../components/shout/Shout";
import StaticProfile from "../components/profile/StaticProfile";
import ShoutSkeleton from "../util/ShoutSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";


import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserProfile } from "../redux/actions/dataActions";

class user extends Component {
      state = {
            profile: null,
            shoutIdParam: null
      };
      componentDidMount() {
            const userName = this.props.match.params.handle;
            const shoutId = this.props.match.params.id;

            if (shoutId) this.setState({ shoutIdParam: shoutId });
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
            const { shoutIdParam } = this.state;
            const recentShoutsMarkup = loading ? (
                  <ShoutSkeleton/>
            ) : shouts === null ? (
                  <p>No recent post from this user...</p>
            ) : !shoutIdParam ? (
                  shouts.map(shout => (
                        <Shout key={shout.shoutId} shout={shout} />
                  ))
            ) : (
                  shouts.map(shout => {
                        if (shout.shoutId !== shoutIdParam) {
                              return (
                                    <Shout key={shout.shoutId} shout={shout} />
                              );
                        } else {
                              return (
                                    <Shout key={shout.shoutId} shout={shout} openDialog/>
                              );
                        }
                  })
            );
            return (
                  <Grid container spacing={10}>
                        <Grid item sm={4} xs={12}>
                              {this.state.profile === null ? (
                                    <ProfileSkeleton/>
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
