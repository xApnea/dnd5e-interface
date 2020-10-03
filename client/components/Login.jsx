import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email : event.target.value})
  }

  handlePasswordChange(event) {
    this.setState({password : event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>

          <label htmlFor='login-email'>Email:
            <input id='login-email' type='email' autoComplete='email' value={this.state.email} onChange={this.handleEmailChange} />
          </label>

          <label htmlFor='login-password'>Password:
            <input id='login-password' type='password' autoComplete='current-password' value={this.state.password} onChange={this.handlePasswordChange} />
          </label>

          <input type='submit' value='Login'/>

        </form>
      </div>
    )
  }
}

export default Login;