import React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './Header.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;