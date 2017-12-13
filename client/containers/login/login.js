import React, { Component } from 'react';
import { locationType } from '../../types/index';
import { emailRegex, passwordRegex } from '../../services/validation';
import { authLogin } from '../../services/rest';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isEmailError: false,
      isPasswordError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  validateEmail() {
    const { email } = this.state;
    if (!emailRegex.test(email) || !email.length) {
      this.setState({ isEmailError: true });
    } else {
      this.setState({ isEmailError: false });
    }
  }

  validatePassword() {
    const { password } = this.state;
    if (!passwordRegex.test(password) || !password.length) {
      this.setState({ isPasswordError: true });
    } else {
      this.setState({ isPasswordError: false });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {
      email, password, isEmailError, isPasswordError,
    } = this.state;
    await this.validateEmail();
    await this.validatePassword();
    try {
      if (!isEmailError && !isPasswordError && email.length && password.length) {
        const user = await authLogin({ email, password });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isEmailError, isPasswordError } = this.state;
    const { location } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{ location.pathname === '/login' ? 'Welcome Back' : 'Sign up with us!' }</h1>
        <input
          name="email"
          type="email"
          onChange={this.handleChange}
          onBlur={this.validateEmail}
          value={this.state.email}
          className={ isEmailError ? 'error-input' : '' }
          required
        />
        <input
          name="password"
          type="password"
          onChange={this.handleChange}
          onBlur={this.validatePassword}
          value={this.state.password}
          className={ isPasswordError ? 'error-input' : '' }
          required
        />
        <button type="submit" onClick={this.handleSubmit} />
      </form>
    );
  }
}

Login.propTypes = {
  location: locationType,
};

export default Login;

