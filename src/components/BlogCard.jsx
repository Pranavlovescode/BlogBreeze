import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate,Link } from 'react-router-dom'; // Use useNavigate instead of useHistory

function BlogCard({ blog, onDelete }) {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleDelete = () => {
    const confirmDelete = window.confirm("Do you want to delete this blog?");
    if (confirmDelete) {
      onDelete(blog.id); // Call the delete function passed as a prop
      alert('Blog deleted succesfully')
    }
  };

  const handleEdit = () => {
    navigate(`/user/blogs/${blog.id}/edit`); // Redirect to edit page using navigate
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-15 transition-transform transform hover:scale-105 w-65 h-90"> {/* Fixed size */}
       <Link to={`/user/blogs/${blog.id}`} key={blog.id}> 
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-bold text-navy">{blog.title}</h2>
        <p className="text-gray-600">{blog.description}</p>
        <span className="text-lightblue font-semibold">{blog.category}</span>
        <div className="flex justify-end space-x-2 mt-4">
          <FaEdit className="text-blue-500 cursor-pointer" onClick={handleEdit} />
          <FaTrash className="text-red-500 cursor-pointer" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
