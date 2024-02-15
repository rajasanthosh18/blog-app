import React, { useState } from 'react'

const RegistrationPage = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const handleRegister = async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:8000/registration',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'content-type':'application/json'}
        })
        if(response.status !== 200){
            alert("Registration Failed");
        }
        else{
            alert("registration successfull")
        }

    }
  return (
    <div>
        <form className='register' onSubmit={handleRegister}>
            <h1>Register</h1>
            <input type='text' placeholder='Email' value={username} onChange={(e)=> setUsername(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button onClick={handleRegister}>Register</button>
            
        </form>
    </div>
  )
}

export default RegistrationPage