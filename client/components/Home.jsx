import React, { useContext } from 'react';

import Gif from './Gif.jsx';
import UserContext from './context/Context.jsx';

function Home() {
  const { userData } = useContext(UserContext);

  let role;
  if (userData.user) {
    switch(userData.user.role) {
      case 'powerUser':
        role = 'Power User';
        break;
      case 'admin':
        role = 'Admin';
        break;
      default:
        role = 'User';
    }
  }

  return (
    <div>
      <h3>Home</h3>
      {
          userData.user
          ? <div>
              <h4>{`Welcome, ${userData.user.username}!`}</h4>
              <p>{`Role: ${role}`}</p>
              <Gif />
            </div>
          :
            <p>Log In to get started!</p>
        }

    </div>
  )
}

export default Home;