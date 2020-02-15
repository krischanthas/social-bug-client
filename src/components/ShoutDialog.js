import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// material ui
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

// redux
import { connect } from "react-redux";
import { getShout } from "../redux/actions/dataActions";

const styles = theme => ({
      ...theme.spread,
      invisibleSeperator: {
            border:'none', 
            margin: 4
      },
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
            position: 'absolute',
            left: '90%'
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
                        userImage
                  },
                  UI: { loading }
            } = this.props;

            const dialogMarkup = loading ? (
                  <CircularProgress size={200} />
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
                                    @{ userName }
                              </Typography>
                              <hr className={classes.invisibleSeperator}/>

                              <Typography
                                    variant="body2"
                                    color="secondary"
                              >
                                    {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                              </Typography>

                              <hr className={classes.invisibleSeperator}/>

                              <Typography variant="body1">{body}</Typography>
                        </Grid>
                  </Grid>
            );

            return (
                  <Fragment>
                        <MyButton
                              tip="Expand shout"
                              tipClassName={classes.expandButton}
                              onClick={this.handleOpen}
                        >
                              <UnfoldMore color="primary"/>
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
      shout: PropTypes.object.isRequired,
      shoutId: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
      shout: state.data.shout,
      UI: state.UI
});

export default connect(mapStateToProps, { getShout })(
      withStyles(styles)(ShoutDialog)
);
