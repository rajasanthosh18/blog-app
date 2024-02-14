import React from "react";

const Post = (props) => {
  return (
    <div className="post">
      <div className="img">
        <img src="https://img.freepik.com/free-photo/sports-car-races-through-dark-blurred-motion-generative-ai_188544-12490.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707782400&semt=ais" />
      </div>
      <div className="side">
        <h1>Title</h1>
        <p>description</p>
      </div>
    </div>
  );
};


export default Post;
