import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage the hamburger menu
  const navigate = useNavigate();

  const username = localStorage.getItem('username'); // Check for username in local storage

  const handleAddBlogClick = () => {
    if (username) {
      navigate('/user/addblog'); // Navigate to Add Blog page if username exists
    } else {
      navigate('/login'); // Redirect to Login if username does not exist
    }
  };

  const handleProfileClick = () => {
    if (username) {
      navigate('/user/profile'); // Navigate to Profile page if username exists
    } else {
      navigate('/login'); // Redirect to Login if username does not exist
    }
  };

  return (
    <nav className="bg-navy text-white p-4 flex justify-between items-center flex-wrap">
      <h1 className="text-4xl font-dancing-script">BlogBreeze</h1>

      {/* Hamburger Icon */}
      <div className="block lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? '✖' : '☰'} {/* Toggle icon */}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`w-full  lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="space-x-4 text-lg flex lg:flex-row ">
          <a href="/" className="hover:text-lightblue">Home</a>
          <button onClick={handleAddBlogClick} className="hover:text-lightblue">Add Blog</button>
          <a href="/about" className="hover:text-lightblue">About</a>
          {username ? (
            <button onClick={handleProfileClick} className="hover:text-lightblue">Profile</button>
          ) : (
            <button onClick={handleProfileClick} className="hover:text-lightblue">Login</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
