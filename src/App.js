import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import {useAuthState} from "react-firebase-hooks/auth"
import Create from './Create';
import Quotes from './Quotes';
import './App.css';
import Login from './Login';
import { auth } from './Firebase';

function App() {
  const [user,loading] = useAuthState(auth)
  console.log(user)
  if(loading){
    <h1>Loading...</h1>
  }
  const logout = (e)=>{
    e.preventDefault()
    auth.signOut()
  }
  return (
    <div className="App">
      <header className='header'>
        <div className="header_left">
          <h1>Quotes</h1>
        </div>
        <div className="header_right"> 
        <Button onClick={logout} className="signIn" variant = "contained" color ="primary">Log out</Button>
        </div>
      </header>
      <div className="app_body">
      {!user ? <Login/>:
      <>
      <Create/>
      <Quotes/>
      </>
        }
      </div>
    </div>
  );
}

export default App;
