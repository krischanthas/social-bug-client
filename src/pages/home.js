import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getShouts } from "../redux/actions/dataActions";
import ShoutSkeleton from "../util/ShoutSkeleton";


import Profile from "../components/profile/Profile";
import Shout from "../components/shout/Shout";
import Grid from "@material-ui/core/Grid";

class home extends Component {
      componentDidMount() {
            this.props.getShouts();
      }

      render() {
            const { shouts, loading } = this.props.data;
            let recentShoutsMarkup = !loading && shouts !== undefined ? (
                  shouts.map(shout => <Shout shout={shout} key={shout.shoutId} />)
            ) : (
                  <ShoutSkeleton/>
            );

            return (
                  <Grid container spacing={10}>
                        <Grid item sm={4} xs={12}>
                              <Profile />
                        </Grid>
                        <Grid item sm={8} xs={12}>
                              {recentShoutsMarkup}
                        </Grid>
                  </Grid>
            );
      }
}

home.propTypes = {
      getShouts: PropTypes.func.isRequired,
      data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
      data: state.data
});
export default connect(mapStateToProps, { getShouts })(home);
