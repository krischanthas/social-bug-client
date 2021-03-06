import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton  from "../../util/MyButton";
// matrial ui
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
//icons
import EditIcon from "@material-ui/icons/Edit";
// redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

const styles = theme => ({
    ...theme.spread,
    button: {
          float:'right'
    }
});

class EditDetails extends Component {
    state = {
        bio: "",
        website: "",
        location: "",
        open: false
    };

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };
    mapUserDetailsToState = credentials => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            website: credentials.website ? credentials.website : "",
            location: credentials.location ? credentials.location : ""
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                label="bio"
                                type="text"
                                multiline
                                rows="3"
                                placeholder="Tell us about yourself"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            ></TextField>
                            <TextField
                                name="website"
                                label="website"
                                type="text"
                                placeholder="Personal/Professional website"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                            >
                            </TextField>

                            <TextField
                                name="location"
                                label="location"
                                type="text"
                                placeholder="Where you live"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            ></TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleSubmit}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}
EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
      credentials: state.user.credentials
});
export default connect(mapStateToProps, { editUserDetails })(
    withStyles(styles)(EditDetails)
);
