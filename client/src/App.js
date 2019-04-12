import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./helpers/history";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ProfileCard from "./components/profile/ProfileCard";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={ProfileCard} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
