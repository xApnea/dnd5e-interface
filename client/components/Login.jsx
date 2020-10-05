import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import UserContext from './context/Context.jsx';
import ErrorNotice from './ErrorNotice.jsx';

function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await Axios.post('users/login', {
        email: email,
        password: password
      })
      if (result.data) {
        setUserData({
          token: result.data.token,
          user: result.data.user
        })
        localStorage.setItem('auth-token', result.data.token);
        history.push('/');
      }

    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message);
      }
    }
  }

  return (
    <div>
      <h3>Login</h3>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className='form' onSubmit={handleSubmit}>

        <label htmlFor='login-email'>Email:
          <input id='login-email' type='email' autoComplete='email' value={email} onChange={handleEmailChange} />
        </label>

        <label htmlFor='login-password'>Password:
          <input id='login-password' type='password' autoComplete='current-password' value={password} onChange={handlePasswordChange} />
        </label>

        <input type='submit' value='Login'/>

      </form>
    </div>
  )
}

export default Login;