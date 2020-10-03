import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './Header.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import UserContext from './context/Context.jsx';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      let tokenResponse = await Axios.post('/users/isTokenValid', null, {
        headers: { 'x-auth-token': token }
      });

      if (tokenResponse.data) {
        let user = await Axios.get('/users', {
          headers: { 'x-auth-token': token }
        });
        setUserData({
          token: token,
          user: user.data.user
        });
      }
    }

    checkLoggedIn();

  }, []);

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App;