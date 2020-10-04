import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import UserContext from './context/Context.jsx';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await Axios.post('users/register', {
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        role: role
      })
      if (result.data.user) {
        result = await Axios.post('users/login', {
          email: email,
          password: password
        })
        setUserData({
          token: result.data.token,
          user: result.data.user
        })
        localStorage.setItem('auth-token', result.data.token);
        history.push('/');
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>

        <label htmlFor='register-email'>Email:
          <input id='register-email' type='email' autoComplete='email' value={email} onChange={handleEmailChange} />
        </label>

        <label htmlFor='register-username'>Username:
          <input id='register-username' type='text' autoComplete='username' value={username} onChange={handleUsernameChange} />
        </label>

        <label htmlFor='register-password'>Password:
          <input id='register-password' type='password' autoComplete='new-password' value={password} onChange={handlePasswordChange} />
          <input id='register-confirmPassword' type='password' autoComplete='new-password' placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </label>

        <label htmlFor='register-role'>Role:
          <select id='register-role' value={role} onChange={handleRoleChange}>
            <option value='user'>User</option>
            <option value='powerUser'>Power User</option>
            <option value='admin'>Admin</option>
          </select>
        </label>

        <input type='submit' value='Register'/>

      </form>
    </div>
  )
}

export default Register;