import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themefile from './util/theme';
import jwtDecode from 'jwt-decode'; 
import "./App.css";
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
//pages
import home from "./pages/home";
import login from "./pages/login";
import signUp from "./pages/signUp";

const theme = createMuiTheme(themefile);

let authenticated;
const token = localStorage.FBIdToken;
if(token) {
  // jwt-decode token
  const decodedToken = jwtDecode(token);
  
  // check expiration
  if(decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }

}
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
                <AuthRoute exact path="/signUp" component={signUp} authenticated={authenticated}/>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
