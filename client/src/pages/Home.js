import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Layout from "../components/Layout";
import IndexPage from "./IndexPage";
import RegistrationPage from "./RegistrationPage";
import { UserContextProvider } from "../UserContext";
import CreatePost from "./CreatePost";
import PostPage from "./PostPage";
import EditPost from "./EditPage";

const home = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path='/create' element={<CreatePost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default home;
