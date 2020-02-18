import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "../layout/LikeButton";
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
            open: false
      };

      handleOpen = () => {
            this.setState({ open: true });
            // send request to server, retreive Shout post data
            this.props.getShout(this.props.shoutId);
      };

      handleClose = () => {
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
                              <Typography
                                    color="primary"
                                    variant="h5"
                                    component={Link}
                                    to={`/users/${userName}`}
                              >
                                    @{userName}
                              </Typography>
                              <hr className={classes.invisibleSeperator} />

                              <Typography variant="body2" color="secondary">
                                    {dayjs(createdAt).format(
                                          "h:mm a, MMM DD YYYY"
                                    )}
                              </Typography>

                              <hr className={classes.invisibleSeperator} />

                              <Typography variant="body1">{body}</Typography>

                              <LikeButton shoutId={shoutId}/>
                              <span>{likeCount} likes</span>

                              <MyButton tip="comments">
                                    <ChatIcon color="primary"/>
                              </MyButton>
                              <span>{commentCount} comments</span>
                        </Grid>
                        <hr className={classes.visibleSeperator} />
                        <CommentForm shoutId={shoutId}/>
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
      UI: PropTypes.object.isRequired,
      commentCount: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
      shout: state.data.shout,
      UI: state.UI
});

export default connect(mapStateToProps, { getShout, clearErrors })(
      withStyles(styles)(ShoutDialog)
);
