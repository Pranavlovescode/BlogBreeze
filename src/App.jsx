import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddBlog from "./Pages/AddBlog";
import AboutUs from "./Pages/About";
import Navbar from "./components/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Blogs from "./Pages/Blogs";
import Profile from "./Pages/Profile";
import EditBlog from "./Pages/EditBlog";
import ViewBlog from "./Pages/ViewBlog";

function App() {
  return (
    <Router>
      <div>
        {/* Navbar is outside the Routes, so it stays persistent across all pages */}
        <Navbar />

        {/* Define the routes for Home, AddBlog, and others */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog/:id" element={<ViewBlog />} />
          <Route path="/user" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="addblog" element={<AddBlog />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id/edit" element={<EditBlog />} />
            <Route path="blogs/:id" element={<ViewBlog />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
