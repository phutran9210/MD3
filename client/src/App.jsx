import { useState } from "react";
import { Route, Routes, useLocation, Outlet, Navigate } from "react-router-dom";
import Register from "./component/regiter/Regiter";
import NavBar from "./component/navBar/NavBar";
import Login from "./component/login/Login";
import Admin from "./admin/Admin";
import Quill from "./component/quill/Quill";
import Question from "./component/questions/Question";
import NotFound from "./component/notFound";
import UserProfile from "./user/UserProfile";
const HomePage = () => {
  return <NavBar />;
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />} />
        <Route path="quill" element={<Quill />} />
        <Route path="posts/:question_id" element={<Question />} />
        <Route path="user" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
