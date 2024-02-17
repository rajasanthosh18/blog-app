import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext'
const Login = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:8000/login',{
        method: 'POST',
        body: JSON.stringify({username,password}),
        headers: {'content-type':'application/json'},
        credentials: 'include',

    })
    if(response.ok){
      response.json().then(userInfo =>{
        setUserInfo(userInfo);
        setRedirect(true)
      })
    }
    else{
        alert("provide correct details")
    }
  }
  if(redirect){
    return (
      <Navigate to='/'/>
    )
  }
  return (
    <div>
        <form className='register'>
            <h1>Login</h1>
            <input type='text' placeholder='Email' value={username} onChange={(e)=> setUsername(e.target.value)}/>
            <input type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button onClick={handleSubmit}>Login</button>
        </form>
    </div>
  )
}

export default Login