import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "../components/Editor";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files,setFiles] = useState('');
  const [redirect,setRedirect] = useState(false)
  const handleCreate = async(e)=>{
    e.preventDefault();
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0])
    const res = await fetch('http://localhost:8000/post',{
      method: 'POST',
      body: data,
      credentials: 'include'
    })
    if(res.ok){
      setRedirect(true)
    }
  }

  if(redirect) {
    return (
      <Navigate to='/'/>
    )
  }
  return (
    <div>
      <form onSubmit={handleCreate}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor value={content} onChange={setContent} />
        <button style={{ marginTop: "10px" }} onClick={handleCreate}>Create a post</button>
      </form>
    </div>
  );
};

export default CreatePost;
