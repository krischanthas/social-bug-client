import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
// material
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
      //icons
      import LocationOn from "@material-ui/icons/LocationOn";
      import LinkIcon from "@material-ui/icons/Link";
      import CalendarToday from "@material-ui/icons/CalendarToday";


// Redux
import { connect } from "react-redux";
const styles = (theme) => ({
      ...theme.spread
});
class Profile extends Component {
    render() {
        // nested destructuring example below
        const {
            classes,
            user: {
                credentials: {
                    handle,
                    createdAt,
                    imageUrl,
                    bio,
                    website,
                    location
                },
                loading,
                authenticated
            }
        } = this.props;
        
        // if not loading, check authentication
        let profileMarkup = !loading ? (authenticated ? (
              // authenticated
              <Paper className={classes.paper}>
                    <div className={classes.profile}>
                          <div className="image-wrapper">
                              <img src={imageUrl} alt="profile" className="profile-image"/>
                          </div>
                          <hr/>
                          <div className="profile-details">
                                <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                                      @{handle}
                                      </MuiLink> 
                                      <hr/>
                                      {bio && <Typography variant="body2">{bio}</Typography>}
                                      <hr/>
                                      {location && (
                                          <Fragment>
                                                <LocationOn color="primary"/> <span>{location}</span>
                                            <hr/>
                                          </Fragment>
                                      )}
                                      {website && (
                                            <Fragment>
                                                  <LinkIcon color="primary"/>
                                                  <a href={website} target="_blank" rel="noopener noreferrer">
                                                      {' '}{website}
                                                  </a>
                                                  <hr/>
                                            </Fragment>
                                      )}
                                      <CalendarToday color="primary"/>{' '}
                                      <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                          </div>
                    </div>
              </Paper>
        ) : (
            //unauthenticated
            <Paper className={classes.paper} >
                  <Typography variant="body2" align="center">
                        No profile found, please log in
                  </Typography>
                  <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                              Login
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                              Sign up
                        </Button>
                  </div>
            </Paper>
        )) : (<p>Loading...</p>);
        return profileMarkup;
    }
}
Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(withStyles(styles)(Profile));
