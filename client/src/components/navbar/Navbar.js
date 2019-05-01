import React, { Component } from "react";

import "./navbar.scss";

class Navbar extends Component {
  performSearch(e) {
    e.preventDefault();
    console.log("Search");
  }

  render() {
    // Logo
    const Logo = (
      <div id="logo" className="Logo" width="150" height="50">
        <a href="#">
          <img
            src="https://fontmeme.com/permalink/190501/6a4a11f5dcb8842d8c51dc1909496da1.png"
            alt="caillou-tv-series-font"
            border="0"
            width="150"
            height="50"
          />
        </a>
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
          <div className="name">Anas Harby</div>
          <div className="image">
            <img src="https://lastfm-img2.akamaized.net/i/u/avatar170s/c0a35a756001a19f51c81e7cd89231a4.png" />
          </div>
        </div>
        <div className="UserProfile-menu">
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

    const Header = (
      <header className="Header">
        {Logo}
        {Navigation}
        {Search}
        {UserProfile}
      </header>
    );

    return <div>{Header}</div>;
  }
}

export default Navbar;
