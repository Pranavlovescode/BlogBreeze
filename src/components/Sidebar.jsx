import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Home, Person, ExitToApp } from '@mui/icons-material'; // Import Material UI icons
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate('/login'); // Redirect to the login page
  };
  return (
    <div className="bg-navy text-white p-10 flex flex-col h-screen shadow-lg border-r-4 border-gray-700 transition duration-300">
  <nav className="flex-grow">
    <ul>
      <li className="mb-4">
        <Link to="/user/profile" className="flex items-center text-white hover:text-gray-300 transition">
          <Person className="mr-2" /> Profile
        </Link>
      </li>
      <li className="mb-4">
        <Link to="/user/blogs" className="flex items-center text-white hover:text-gray-300 transition">
          <Home className="mr-2" /> Blogs
        </Link>
      </li>
      <li className="mb-4">
        <Link to="/user/addblog" className="flex items-center text-white hover:text-gray-300 transition">
          <Home className="mr-2" /> AddBlog
        </Link>
      </li>
    </ul>
  </nav>
  <button 
      onClick={handleLogout} // Add onClick handler
      className="flex items-center mt-auto text-red-500 hover:text-red-400 transition"
    >
      <ExitToApp className="mr-2" /> Logout
    </button>
</div>

  );
}
