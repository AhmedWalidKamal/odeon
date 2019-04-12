import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
