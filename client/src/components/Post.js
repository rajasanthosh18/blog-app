import React from "react";

const Post = ({title,summary,updatedAt,content,cover,author}) => {
  return (
    <div className="post">
      <div className="img">
        <img src={"http://localhost:8000/" + cover} />
      </div>
      <div className="side">
        <h1>{title}</h1>
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
