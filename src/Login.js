import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './Firebase'
import './login.css'

function Login() {
  const loggedIn = (e)=>{
    e.preventDefault()
        auth.signInWithPopup(provider).catch((error)=>alert(error.message))
  }
  return (
    <div className='login'>
        <h1>QuotesIN</h1>
        <Button onClick={loggedIn}>Login With Google</Button>
    </div>
  )
}

export default Login