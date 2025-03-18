import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

function BlogCardHome({ blog, onDelete }) {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="bg-white shadow-lg rounded-lg p-15 transition-transform transform hover:scale-105 w-65 h-90"> {/* Fixed size */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-navy truncate">{blog.title}</h2> {/* Title will truncate if too long */}
        <p className="text-gray-600 text-sm h-16 overflow-hidden text-ellipsis">
          {blog.description}
        </p> {/* Fixed height for description */}
        <span className="text-lightblue font-semibold">{blog.category}</span>
      </div>
    </div>
  );
}

export default BlogCardHome;
