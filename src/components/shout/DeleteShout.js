import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// material ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import DialogTitle from "@material-ui/core/DialogTitle";

// redux
import { connect } from "react-redux";
import { deleteShout } from "../../redux/actions/dataActions";

const styles = {
      deleteButton: {
            top: "10%",
            left: "90%",
            position: "absolute"
      }
};

class DeleteShout extends Component {
      state = {
            open: false
      };

      handleOpen = () => {
            this.setState({ open: true });
      };

      handleClose = () => {
            this.setState({ open: false });
      };

      deleteShout = () => {
            this.props.deleteShout(this.props.shoutId);
            this.setState({ open: false });
      }

      render() {
            const { classes } = this.props;
            return (
                  <Fragment>
                        <MyButton
                              tip="Delete Shout"
                              onClick={this.handleOpen}
                              btnClassName={classes.deleteButton}
                        >
                              <DeleteOutlined color="secondary" />
                        </MyButton>
                        <Dialog
                              open={this.state.open}
                              onClose={this.handleClose}
                              fullWidth
                              maxWidth="sm"
                        >
                              <DialogTitle>
                                    Are you sure you want to delete this shout?
                              </DialogTitle>
                              <DialogActions>
                                    <Button
                                          onClick={this.handleClose}
                                          color="primary"
                                    >Cancel</Button>
                                    <Button
                                          onClick={this.deleteShout}
                                          color="secondary"
                                    >Delete</Button>
                              </DialogActions>
                        </Dialog>
                  </Fragment>
            );
      }
}
DeleteShout.propTypes = {
      deleteShout: PropTypes.func.isRequired,
      classes: PropTypes.object.isRequired,
      shoutId: PropTypes.string.isRequired
};
export default connect(null, { deleteShout })(withStyles(styles)(DeleteShout));
