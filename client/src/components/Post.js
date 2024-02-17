import React from "react";
import { Link } from "react-router-dom";

const Post = ({_id,title,summary,updatedAt,content,cover,author}) => {
  return (
    <div className="post">
      <div className="img">
        <Link to={`/post/${_id}`}>
        <img src={"http://localhost:8000/" + cover} /></Link>
      </div>
      <div className="side">
        <Link to={`/post/${_id}`} style={{textDecoration:'none',color:'inherit'}}>
          <h1>{title}</h1>
        </Link>
        <p>
          <p>{author.username}</p>
          <time className="time">EditedAt : {updatedAt.slice(0, 10)}</time>  
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
};


export default Post;
