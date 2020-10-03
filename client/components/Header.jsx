import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from './context/Context.jsx';

function Header(props) {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const home = () => history.push('/');
  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const logout = () => history.push('/logout');

  return (
    <div className='header'>
      <h3 onClick={home}>GIF Generator</h3>
      <nav>
        {
          userData.user
          ? <button>Log Out</button>
          : <>
              <button onClick={register}>Register</button>
              <button onClick={login}>Log In</button>
            </>
        }
      </nav>
    </div>
  )
}

export default Header;