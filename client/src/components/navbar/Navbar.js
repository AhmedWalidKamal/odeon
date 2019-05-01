import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./navbar.scss";

class Navbar extends Component {
  performSearch(e) {
    e.preventDefault();
    console.log("Search");
  }

  render() {
    const { isAuthenticated, user } = this.props.user;
    console.log(user);

    // Logo
    const Logo = (
      <div id="logo" className="Logo" width="150" height="50">
        <Link to="/">
          <img
            src="https://fontmeme.com/permalink/190501/6a4a11f5dcb8842d8c51dc1909496da1.png"
            alt="caillou-tv-series-font"
            border="0"
            width="150"
            height="50"
          />
        </Link>
      </div>
    );

    // Navigation
    const Navigation = (
      <div id="navigation" className="Navigation">
        <nav>
          <ul>
            <li>Browse</li>
            <li>My films</li>
            <li>Activity</li>
          </ul>
        </nav>
      </div>
    );

    // Auth nav items
    const authNav = (
      <div id="auth-nav" className="auth-nav">
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    );

    // Search
    const Search = (
      <form onSubmit={this.performSearch} id="search" className="Search">
        <input type="search" placeholder="Search for a title..." />
      </form>
    );

    // User Profile
    const UserProfile = (
      <div className="UserProfile">
        <div className="User">
          <div className="name">{user.username}</div>
          <div className="image">
            <img src={user.avatar} />
          </div>
        </div>
        <div className="UserProfile-menu">
          <div className="UserProfileSwitch">
            <ul>
              <li>
                <div className="UserProfile-image">
                  <img src="http://lorempixel.com/96/96" />
                </div>
                <div className="UserProfile-name">Alexander</div>
              </li>
              <li>
                <div className="UserProfile-image">
                  <img src="http://lorempixel.com/96/96" />
                </div>
                <div className="UserProfile-name">Mattias</div>
              </li>
            </ul>
          </div>
          <div className="UserNavigation">
            <ul>
              <li>Your Account</li>
              <li>Help Center</li>
              <li>Sign out</li>
            </ul>
          </div>
        </div>
      </div>
    );

    const authenticatedHeader = (
      <header className="Header">
        {Logo}
        {Navigation}
        {Search}
        {UserProfile}
      </header>
    );

    const loggedOutHeader = (
      <header className="Header">
        {Logo}
        {Navigation}
        {Search}
        {authNav}
      </header>
    );

    return <div>{isAuthenticated ? authenticatedHeader : loggedOutHeader}</div>;
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {}
)(Navbar);
