import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import "./App.css";
import Navbar from "./components/Navbar";
import home from "./pages/home";
import login from "./pages/login";
import signUp from "./pages/signUp";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#99d5cf",
      main: "#80cbc4",
      dark: "#598e89",
      contrastText: "#fff"
    },
    secondary: {
      light: "#fff391",
      main: "#fff176",
      dark: "#b2a852",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});

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
                <Route exact path="/login" component={login} />
                <Route exact path="/signUp" component={signUp} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
