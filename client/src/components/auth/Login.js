import React, { Component } from 'react';

import './auth.scss'

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="form-background">
          <h1>Login</h1>
          <form>
            <input type="email" name="email" placeholder="Email" />
            <br />
            <input type="password" name="password" placeholder="Password" />
            <br /><br />
            <input type="submit" defaultValue="Sign Up" />
          </form>
        </div>
        <div className="signup">
          <p>Don't have an account?<a href="#">Sign Up</a></p>
        </div>
      </div>
    );
  }
}

export default (Login);
