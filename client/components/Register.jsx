import React from 'react';
import Axios from 'axios';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email : event.target.value})
  }
  handleUsernameChange(event) {
    this.setState({username : event.target.value})
  }
  handlePasswordChange(event) {
    this.setState({password : event.target.value})
  }
  handleConfirmPasswordChange(event) {
    this.setState({confirmPassword : event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let result = await Axios.post('users/register', {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      })
      alert(`User: ${result.data.user.username} successfully registered! Please log in to your new account.`)

      this.setState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      });
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h3>Register</h3>
        <form onSubmit={this.handleSubmit}>

          <label htmlFor='register-email'>Email:
            <input id='register-email' type='email' autoComplete='email' value={this.state.email} onChange={this.handleEmailChange} />
          </label>

          <label htmlFor='register-username'>Username:
            <input id='register-username' type='text' autoComplete='username' value={this.state.username} onChange={this.handleUsernameChange} />
          </label>

          <label htmlFor='register-password'>Password:
            <input id='register-password' type='password' autoComplete='new-password' value={this.state.password} onChange={this.handlePasswordChange} />
            <input id='register-confirmPassword' type='password' autoComplete='new-password' placeholder='Confirm Password' value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
          </label>

          <input type='submit' value='Register'/>

        </form>
      </div>
    )
  }
}

export default Register;