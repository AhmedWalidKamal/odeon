import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { register } from "../../actions/userActions";
import "./auth.scss";

class SignUp extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Redirecting to home if user is already logged in
    if (this.props.user.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, username, password, confirmPassword } = this.state.user;
    console.log(this.props);
    const { dispatch } = this.props;
    if (username && email && password && confirmPassword) {
      this.props.register({ username, email, password }, this.props.history);
    }
  }

  render() {
    const { username, email, password, confirmPassword } = this.state.user;
    return (
      <div className="container">
        <div className="form-background">
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              placeholder="Username"
            />
            <br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Password"
            />
            <br />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
              placeholder="Confirm Password"
            />
            <br />
            <br />
            <input type="submit" defaultValue="Sign Up" />
          </form>
        </div>
        <div className="login">
          <p>
            already have an account?<Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  user: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { register }
)(SignUp);
