import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
// matrial ui
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
//icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// redux
import { connect } from "react-redux";
import { postShout } from "../redux/actions/dataActions";

const styles = theme => ({
      ...theme.spread,
      submitButton: {
            position: "relative"
      },
      progressSpinner: {
            position: "absolute"
      },
      closeButton: {
            position: "absolute",
            left: "90%",
            top: "10%"
      }
});
class PostShout extends Component {
      state = {
            open: false,
            body: "",
            errors: {}
      };

      componentWillReceiveProps(nextProps) {
            if (nextProps.UI.errors) {
                  this.setState({
                        errors: nextProps.UI.errors
                  });
            }
            if (!nextProps.UI.errors && !nextProps.UI.loading) {
                  this.setState({
                        body: '',
                        open: false,
                        errors: {} 
                  });
            }
      }

      handleOpen = () => {
            this.setState({ open: true });
      };
      handleClose = () => {
            this.setState({ open: false, errors: {} });
      };

      handleChange = event => {
            this.setState({ [event.target.name]: event.target.value });
      };

      handleSubmit = event => {
            event.preventDefault();
            this.props.postShout({ body: this.state.body });
      };

      render() {
            const { errors } = this.state;
            const {
                  classes,
                  UI: { loading }
            } = this.props;
            return (
                  <Fragment>
                        <MyButton tip="Post a shout!" onClick={this.handleOpen}>
                              <AddIcon />
                        </MyButton>
                        <Dialog
                              open={this.state.open}
                              onClose={this.handleClose}
                              fullWidth
                              maxWidth="sm"
                        >
                              <MyButton
                                    tip="closed"
                                    onClick={this.handleClose}
                                    tipClassName={classes.closeButton}
                              >
                                    <CloseIcon />
                              </MyButton>
                              <DialogTitle>Post a new shout</DialogTitle>
                              <DialogContent>
                                    <form onSubmit={this.handleSubmit}>
                                          <TextField
                                                name="body"
                                                type="text"
                                                label="Give a shout!"
                                                multiline
                                                rows="3"
                                                placeholder="Post a message"
                                                error={
                                                      errors.body ? true : false
                                                }
                                                helperText={errors.body}
                                                className={classes.textField}
                                                onChange={this.handleChange}
                                                fullWidth
                                          />
                                          <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.submitButton}
                                                disabled={loading}
                                          >
                                                Submit
                                                {loading && (
                                                      <CircularProgress
                                                            size={30}
                                                            className={
                                                                  classes.progressSpinner
                                                            }
                                                      />
                                                )}
                                          </Button>
                                    </form>
                              </DialogContent>
                        </Dialog>
                  </Fragment>
            );
      }
}

PostShout.propTypes = {
      postShout: PropTypes.func.isRequired,
      UI: PropTypes.object.isRequired,
      classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
      UI: state.UI
});
export default connect(mapStateToProps, { postShout })(
      withStyles(styles)(PostShout)
);
