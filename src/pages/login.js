import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import icon from "../images/icon.png";
/* Redux */
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
/* Material ui */
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    form: {
        textAlign: "center"
    },
    image: {
        margin: "20px auto 20px auto",
        width: "200px"
    },
    pageTitle: {
        margin: "10px auto 10px auto"
    },
    textField: {
        margin: "10px auto 10px auto"
    },
    button: {
        marginTop: "20px",
        position: "relative" // set to allow spinner a position of absolute
    },
    customError: {
        color: "red",
        fontSize: "0.8 rem",
        marginTop: "10px"
    },
    progress: {
        position: "absolute"
    }
};

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const {
            classes,
            UI: { loading }
        } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={icon} alt="bug" className={classes.image} />
                    <Typography variant="h1" className={classes.pageTitle}>
                        Login
                    </Typography>

                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />

                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />

                        {errors.general && (
                            <Typography
                                variant="body2"
                                className={classes.customError}
                            >
                                {errors.general}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Login
                            {loading && (
                                <CircularProgress
                                    size={30}
                                    className={classes.progress}
                                    disabled={loading}
                                />
                            )}
                        </Button>
                        <br />
                        <br />
                        <small>
                            Don't have an account? Sign up{" "}
                            <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

const mapActionToProps = {
    loginUser
};
export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(login));
