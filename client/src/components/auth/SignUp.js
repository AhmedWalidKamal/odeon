import React, { Component } from 'react';

import './auth.scss'

class SignUp extends Component {
  render() {
    return (
      <div className="container">
        <div className="form-background">
          <h1>Sign Up</h1>
          <form>
            <input type="text" name="username" placeholder="Username" />
            <br />
            <input type="email" name="email" placeholder="Email" />
            <br />
            <input type="password" name="password" placeholder="Password" />
            <br />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" />
            <br /><br />
            <input type="submit" defaultValue="Sign Up" />
          </form>
        </div>
        <div className="login">
          <p>already have an account?<a href="#">login</a></p>
        </div>
      </div>
    );
  }
}

export default (SignUp);
