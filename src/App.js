import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
import themefile from "./util/theme";
import axios from 'axios';
import "./App.css";

// redux
import { SET_AUTHENTICATED } from './redux/types';
import { logOutUser, getUserData } from './redux/actions/userActions';

// material ui
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signUp from "./pages/signUp";
import user from "./pages/user";

const theme = createMuiTheme(themefile);

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);

    // check expiration
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logOutUser())
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Navbar />
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={home} />
                                <AuthRoute
                                    exact
                                    path="/login"
                                    component={login}
                                />
                                <AuthRoute
                                    exact
                                    path="/signUp"
                                    component={signUp}
                                />
                                <Route exact path="/users/:handle" component={user} />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
