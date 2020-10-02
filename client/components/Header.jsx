import React from 'react';
import { useHistory } from 'react-router-dom';

function Header(props) {
  const history = useHistory();

  const home = () => history.push('/');
  const register = () => history.push('/register');
  const login = () => history.push('/login');

  return (
    <div className='header'>
      <h3 onClick={home}>GIF Generator</h3>
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Header;