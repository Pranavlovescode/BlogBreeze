import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { db } from '../Firebase/config'; // Adjust the path to your Firebase configuration
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

export default function ViewBlog() {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null); // State to store blog details

  useEffect(() => {
    const fetchBlog = async () => {
      const blogRef = doc(db, 'blogs', id); // Adjust 'blogs' to your collection name
      const blogDoc = await getDoc(blogRef);
      if (blogDoc.exists()) {
        setBlog(blogDoc.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>; // Show a loading message while fetching
  }

  return (
    <div className="flex m-3 items-center justify-center min-h-screen bg-gray-100 w-full">
  <div className="bg-white shadow-lg rounded-lg p-6 mx-4 max-w-4xl w-full">
    <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
          {blog.title}
        </h1>
        <h2 className="mb-2 text-center text-xl font-semibold text-gray-600 italic">
          {blog.description}
        </h2>
        
        <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-100 shadow-lg">
          <img
            src={blog.image}
            loading="lazy"
            alt={blog.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
          Category: <span className="text-green-600">{blog.category}</span>
        </h3>

        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Blog
        </h2>
        <p className="mb-6 text-gray-500 border-l-4 border-green-800 p-4">
          {blog.content}
        </p>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center mb-2">
            <span className="p-2">👤</span>
            <span className="text-green-800">{blog.username}</span>
          </h3>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center mb-4">
            <span className="p-2">📧</span>
            <span className="text-green-800">{blog.email}</span>
          </h3>
          <p className="text-gray-500">
            Published on: {new Date(blog.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
