import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { changeCollectionName } from "../../actions/movieActions";

import "./navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.performSearch = this.performSearch.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  performSearch(e) {
    e.preventDefault();
    const { searchQuery } = this.state;
    console.log(searchQuery);
  }

  render() {
    const { isAuthenticated, user } = this.props.userReducer;

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
            <li>
              <Link
                className="Link"
                to="/browse/top_rated"
                onClick={() => this.props.changeCollectionName("top_rated")}
              >
                Top Rated
              </Link>
            </li>
            <li>
              <Link
                className="Link"
                to="/browse/popular"
                onClick={() => this.props.changeCollectionName("popular")}
              >
                Popular
              </Link>
            </li>
            {/* <li>
              <Link className="Link" to="/browse/latest" onClick={() => this.props.changeCollectionName("latest")}>
                Latest
              </Link>
            </li> */}
            <li>
              <Link
                className="Link"
                to="/browse/upcoming"
                onClick={() => this.props.changeCollectionName("upcoming")}
              >
                Upcoming
              </Link>
            </li>
            <li>
              <Link
                className="Link"
                to="/browse/now_playing"
                onClick={() => this.props.changeCollectionName("now_playing")}
              >
                Now Playing
              </Link>
            </li>
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
              <Link className="Link" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="Link" to="/signup">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );

    const { searchQuery } = this.state;
    // Search
    const Search = (
      <form onSubmit={this.performSearch} id="search" className="Search">
        <input
          type="search"
          name="searchQuery"
          value={searchQuery}
          onChange={this.handleChange}
          placeholder="Search for a title..."
        />
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
          <div className="UserNavigation">
            <ul>
              <li>
                <Link className="Link" to="/profile">
                  Profile
                </Link>
              </li>
              <li>Help Center</li>
              <li>
                <Link
                  className="Link"
                  to="/"
                  onClick={() => this.props.logout()}
                >
                  Logout
                </Link>
              </li>
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
  userReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userReducer: state.userReducer
});

export default connect(
  mapStateToProps,
  { logout, changeCollectionName }
)(Navbar);
