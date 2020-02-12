import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getShouts } from "../redux/actions/dataActions";

import Profile from "../components/Profile";
import Shout from "../components/Shout";
import Grid from "@material-ui/core/Grid";

class home extends Component {
    componentDidMount() {
        this.props.getShouts();
    }

    render() {
        const { shouts, loading } = this.props.data;
        const recentShoutsMarkup = !loading ? (
            shouts.map(shout => <Shout shout={shout} key={shout.shoutId} />)
        ) : (
            <p>Loading...</p>
        );

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentShoutsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

home.propTpes = {
    getShouts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequiredF
};

const mapStateToProps = state => ({
    data: state.data
});
export default connect(mapStateToProps, { getShouts })(home);
