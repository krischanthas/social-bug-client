import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// material ui
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// redux
import { connect } from "react-redux";
import { getShout, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
      ...theme.spread,
      profileImage: {
            height: 200,
            maxHeight: 200,
            borderRadius: "49%",
            objectFit: "cover"
      },
      dialogContent: {
            padding: 20
      },
      closeButton: {
            position: "absolute",
            left: "90%"
      },
      expandButton: {
            position: "absolute",
            left: "90%"
      },
      spinnerDiv: {
            textAlign: "center",
            marginTop: 50,
            marginBottom: 50
      }
});

class ShoutDialog extends Component {
      state = {
            open: false,
            newPath: "",
            oldPath: ""
      };

      componentDidMount() { 
            // upon rendering, check if ShoutDialog received 'openDialog' prop
            if (this.props.openDialog) {
                  this.handleOpen();
            }
      }

      handleOpen = () => {
            // change url path when opening a specific shout dialog
            let oldPath = window.location.pathname;
            const { userName, shoutId } = this.props;
            const newPath = `/users/${userName}/shout/${shoutId}`;
            if(oldPath === newPath) { oldPath = `/users/${userName}`; }
            window.history.pushState(null, null, newPath);

            this.setState({ open: true, newPath, oldPath });
            this.props.getShout(this.props.shoutId);
      };

      handleClose = () => {
            // change url path to previous path upon closing shout dialog
            window.history.pushState(null, null, this.state.oldPath);
            this.setState({ open: false });
            this.props.clearErrors();
      };

      render() {
            const {
                  classes,
                  shout: {
                        shoutId,
                        userName,
                        body,
                        createdAt,
                        likeCount,
                        commentCount,
                        userImage,
                        comment
                  },
                  UI: { loading }
            } = this.props;

            // display spinner if loading, otherwise display dialog markup
            const dialogMarkup = loading ? ( 
                  <div className={classes.spinnerDiv}>
                        <CircularProgress size={200} /> 
                  </div>
            ) : (
                  <Grid container spacing={10}>
                        <Grid item sm={5}>
                              <img
                                    src={userImage}
                                    alt="Profile"
                                    className={classes.profileImage}
                              />
                        </Grid>
                        <Grid item sm={7}>
                              {/* @username link */}
                              <Typography
                                    color="primary"
                                    variant="h5"
                                    component={Link}
                                    to={`/users/${userName}`}
                              >
                                    @{userName}
                              </Typography>
                              <hr className={classes.invisibleSeperator} />

                              {/* Created At */}
                              <Typography variant="body2" color="secondary">
                                    {dayjs(createdAt).format(
                                          "h:mm a, MMM DD YYYY"
                                    )}
                              </Typography>
                              <hr className={classes.invisibleSeperator} />

                              {/* Shout Body */}
                              <Typography variant="body1">{body}</Typography>

                              {/* Like button */}
                              <LikeButton shoutId={shoutId} />
                              <span>{likeCount} likes</span>

                              {/* Comments */}
                              <MyButton tip="comments">
                                    <ChatIcon color="primary" />
                              </MyButton>
                              <span>{commentCount} comments</span>
                        </Grid>

                        <hr className={classes.visibleSeperator} />
                        {/* Form */}
                        <CommentForm shoutId={shoutId} />

                        {/* List of comments */}
                        <Comments comments={comment} />
                  </Grid>
            );

            return (
                  <Fragment>
                        <MyButton
                              tip="Expand shout"
                              tipClassName={classes.expandButton}
                              onClick={this.handleOpen}
                        >
                              <UnfoldMore color="primary" />
                        </MyButton>

                        <Dialog
                              open={this.state.open}
                              onClose={this.handleClose}
                              fullWidth
                              maxWidth="sm"
                        >
                              <MyButton
                                    tip="Close"
                                    tipClassName={classes.closeButton}
                                    onClick={this.handleClose}
                              >
                                    <CloseIcon />
                              </MyButton>

                              <DialogContent className={classes.dialogContent}>
                                    {dialogMarkup}
                              </DialogContent>
                        </Dialog>
                  </Fragment>
            );
      }
}

ShoutDialog.propTypes = {
      getShout: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired,
      shout: PropTypes.object.isRequired,
      shoutId: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
      shout: state.data.shout,
      UI: state.UI
});

export default connect(mapStateToProps, { getShout, clearErrors })(
      withStyles(styles)(ShoutDialog)
);
