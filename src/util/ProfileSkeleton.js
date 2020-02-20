import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import noImg from "../images/no-img.png";

// material ui
import Paper from "@material-ui/core/Paper";

// icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
      ...theme.spread,
      handle: {
            height: 20,
            width: 60,
            margin: "0 auto 7px auto",
            backgroundColor: theme.palette.primary.main
      },
      fullLine: {
            height: 15,
            width: "100%",
            marginBottom: 10,
            backgroundColor: "rgba(0,0,0,0.6)"
      },
      halfLine: {
            height: 15,
            width: "50%",
            marginBottom: 10,
            backgroundColor: "rgba(0,0,0,0.6)"
      }
});

const ProfileSkeleton = (props) => {
      const { classes } = props;
      return (
            <div>
                  <Paper className={classes.paper}>
                        <div className={classes.profile}>
                              <div className="image-wrapper">
                                    <img
                                          src={noImg}
                                          alt="profile"
                                          className="profile-image"
                                    />
                              </div>
                              <hr />
                              <div className="profile-details">
                                    <div className={classes.handle} />
                                    <hr />
                                    <div className={classes.fullLine} />
                                    <div className={classes.fullLine} />
                                    <hr />
                                    <LocationOn color="primary" />{" "}
                                    <span>Location</span>
                                    <hr />
                                    <LinkIcon color="primary" />{" "}
                                    https://website.com
                                    <hr />
                                    <CalendarToday color="primary" /> Joined
                                    date
                              </div>
                        </div>
                  </Paper>
            </div>
      );
};

ProfileSkeleton.propTypes = {
      classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
