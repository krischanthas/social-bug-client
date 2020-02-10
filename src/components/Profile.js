import React, { Component, Fragment } from "react";
import EditDetails from "./EditDetails";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// material
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
//icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Redux
import { connect } from "react-redux";
import { logOutUser, uploadImage } from "../redux/actions/userActions";
const styles = theme => ({
    ...theme.spread
});
class Profile extends Component {
    handleImageChange = event => {
        const image = event.target.files[0];
        // send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditPicture = event => {
        const fileInput = document.getElementById("image-input");
        fileInput.click();
    };
    handleLogOut = () => {
          this.props.logOutUser();
    }
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
        let profileMarkup = !loading ? (
            authenticated ? (
                // authenticated
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img
                                src={imageUrl}
                                alt="profile"
                                className="profile-image"
                            />
                            <input
                                type="file"
                                id="image-input"
                                hidden="hidden"
                                onChange={this.handleImageChange}
                            />
                            <Tooltip
                                title="Edit profile picture"
                                placement="top"
                            >
                                <IconButton
                                    onClick={this.handleEditPicture}
                                    className="button"
                                >
                                    <EditIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink
                                component={Link}
                                to={`/users/${handle}`}
                                color="primary"
                                variant="h5"
                            >
                                @{handle}
                            </MuiLink>
                            <hr />
                            {bio && (
                                <Typography variant="body2">{bio}</Typography>
                            )}
                            <hr />
                            {location && (
                                <Fragment>
                                    <LocationOn color="primary" />{" "}
                                    <span>{location}</span>
                                    <hr />
                                </Fragment>
                            )}
                            {website && (
                                <Fragment>
                                    <LinkIcon color="primary" />
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {" "}
                                        {website}
                                    </a>
                                    <hr />
                                </Fragment>
                            )}
                            <CalendarToday color="primary" />{" "}
                            <span>
                                Joined {dayjs(createdAt).format("MMM YYYY")}
                            </span>
                        </div>
                        <Tooltip
                              title="Logout"
                              placement="top"
                        >
                              <IconButton onClick={this.handleLogOut}>
                                    <KeyboardReturn color="primary"/>
                              </IconButton>
                        </Tooltip>
                        <EditDetails/>
                    </div>
                </Paper>
            ) : (
                //unauthenticated
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        No profile found, please log in
                    </Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/login"
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/signup"
                        >
                            Sign up
                        </Button>
                    </div>
                </Paper>
            )
        ) : (
            <p>Loading...</p>
        );
        return profileMarkup;
    }
}
Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logOutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
      logOutUser,
      uploadImage
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
