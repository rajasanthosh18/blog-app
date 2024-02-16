import React, { useEffect, useState } from "react";
import '../App.css';
import { Link } from "react-router-dom";

const Header = () => {
  const [userInfo,setUserInfo]=useState(null)
  useEffect(()=>{
    fetch('http://localhost:8000/profile',{
    credentials: 'include',
  }).then(response => {
    response.json().then(userInfo => {
      setUserInfo(userInfo);
    });
  });
}, []);
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      
      <nav>
      {(userInfo && (
        <>
        <p>{userInfo.username}</p>
          <Link to=''>Create a post</Link>
          <Link to=''>Logout</Link>

        </>
      ))}
      {!userInfo && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/registration">SignUp</Link>
        </>
      )}
        
      </nav>
    </header>
  );
};

export default Header;
