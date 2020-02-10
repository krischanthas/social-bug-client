import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

/* Material Ui */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
/* Icon */
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

/* Redux */
import { connect } from "react-redux";
class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <div>
                <AppBar>
                    <Toolbar className="nav-container">
                        {authenticated ? (
                            <Fragment>
                              <MyButton tip="Post a shout!">
                                <AddIcon/>
                              </MyButton>
                              <MyButton tip="Home">
                                <Link to="/">
                                  <HomeIcon />
                                </Link>
                              </MyButton>
                              <MyButton tip="Notifications">
                                <Notifications/>
                              </MyButton>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/login"
                                >
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/">
                                    Home
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/signUp"
                                >
                                    Sign Up
                                </Button>
                            </Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});
export default connect(mapStateToProps)(Navbar);
