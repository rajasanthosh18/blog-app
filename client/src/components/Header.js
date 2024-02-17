import React, { useContext, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userIn) => {
        setUserInfo(userIn);
      });
    });
  },[]);

  const logout = ()=>{
    fetch('http://localhost:8000/logout',{
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null)
  }

  const username = userInfo?.username

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>

      <nav>
        {username && (
          <>
            <span >Hello, {userInfo.username}</span>
            <Link to="/create">Create a post</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!username && (
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
