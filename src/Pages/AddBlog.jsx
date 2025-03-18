import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { getAuth } from 'firebase/auth'; // Import auth to fetch current user
import { useNavigate } from 'react-router-dom';
import { Typography } from "@mui/material";

function AddBlog() {
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    content: '',
    customCategory: '',
  });

  const username = localStorage.getItem('username'); // Fetch username from local storage

  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCategory = blogData.category === 'Other' ? blogData.customCategory : blogData.category;
    
    // Fetch username and email from local storage
    const username = localStorage.getItem('username'); // assuming 'username' is saved
    const email = localStorage.getItem('email'); // assuming 'email' is saved

    if (!username || !email) {
      alert('User information not found, please login first.');
      navigate('/login');
      return;
    }

    const db = getFirestore(); // Initialize Firestore
    const blogSubmission = {
      ...blogData,
      category: finalCategory,
      username,
      email,
      createdAt: new Date().toISOString(), // Add current date/time
    };

    try {
      // Add blog data to Firestore (it will auto-generate an ID for the document)
      const docRef = await addDoc(collection(db, 'blogs'), blogSubmission);
      console.log('Blog added with ID: ', docRef.id);
      alert('Blog submitted successfully!');
      navigate('/user/blogs'); // Redirect to blogs page after submission
    } catch (error) {
      console.error('Error adding blog: ', error);
      alert('Error submitting the blog, please try again.');
    }
  };


  return (
    <>
      {username ?(<div className="bg-white min-h-screen text-navy">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold text-center text-navy mb-8">
          Add a New Blog
        </h1>
        {/* Form container with increased box shadow and width */}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-2xl border border-navy"> {/* Increased box shadow */}
          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-navy font-semibold mb-2" htmlFor="title">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={blogData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border border-navy rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="Enter blog title"
              />
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-navy font-semibold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={blogData.description}
                onChange={handleChange}
                required
                className="w-full p-3 border border-navy rounded-md focus:outline-none focus:ring-2 focus:ring-navy resize-none"
                placeholder="Write a short description"
                rows="5"
              ></textarea>
            </div>

            {/* Category Dropdown */}
            <div className="mb-6">
              <label className="block text-navy font-semibold mb-2" htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={blogData.category}
                onChange={handleChange}
                required
                className="w-full p-3 border border-navy rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <option value="">Select a category</option>
                <option value="Travel">Travel</option>
                <option value="Fashion">Fashion</option>
                <option value="Cooking">Cooking</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="DIY">DIY</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Custom Category Input (only shown if 'Other' is selected) */}
            {blogData.category === 'Other' && (
              <div className="mb-6">
                <label className="block text-navy font-semibold mb-2" htmlFor="customCategory">
                  Custom Category
                </label>
                <input
                  type="text"
                  name="customCategory"
                  id="customCategory"
                  value={blogData.customCategory}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-navy rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  placeholder="Enter custom category"
                />
              </div>
            )}

            {/* Image Input */}
            <div className="mb-6">
              <label className="block text-navy font-semibold mb-2" htmlFor="image">
                Blog Image URL
              </label>
              <input
                type="text"
                name="image"
                id="image"
                value={blogData.image}
                onChange={handleChange}
                required
                className="w-full p-3 border border-navy rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="Paste image URL"
              />
            </div>

            {/* Blog Content Input */}
            <div className="mb-6">
              <label className="block text-navy font-semibold mb-2" htmlFor="content">
                Write Blog Content
              </label>
              <textarea
                name="content"
                id="content"
                value={blogData.content}
                onChange={handleChange}
                required
                className="w-full p-3 border border-navy rounded-md focus:outline-none focus:ring-2 focus:ring-navy resize-none"
                placeholder="Write the full blog content here"
                rows="10"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-navy text-white px-6 py-3 rounded-full hover:bg-lightblue font-semibold transition-all duration-300"
              >
                Submit Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>):(
      <Typography variant="h6" color="textSecondary">
      Please login to add a new Blog
    </Typography>
    )}
    </>
  );
}

export default AddBlog;
