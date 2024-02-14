import React, { useState } from 'react'

const RegistrationPage = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const handleRegister = async(e)=>{
        e.preventDefault();
        await fetch('http://localhost/8000',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'content-type':'application/json'}
        })
    }
  return (
    <div>
        <form className='register'>
            <h1>Register</h1>
            <input type='text' placeholder='Email' value={username} onChange={(e)=> setUsername(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button onClick={handleRegister}>Register</button>
            
        </form>
    </div>
  )
}

export default RegistrationPage