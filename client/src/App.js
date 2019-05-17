import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./helpers/history";
import setAuthToken from "./util/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logout } from "./actions/userActions";
import "./App.css";
import store from "./store";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ProfileCard from "./components/profile/ProfileCard";
import MovieCard from "./components/movie/MovieCard";
import MovieDiaryEntry from "./components/diary/MovieDiaryEntry";

// Check for jwt token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logout());

    // Redirect to login page if user's login expired
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/browse/:collection" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/profile" component={ProfileCard} />
              <Route exact path="/movie/:id" component={MovieCard} />
              <Route exact path="/diary" component={MovieDiaryEntry} />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
