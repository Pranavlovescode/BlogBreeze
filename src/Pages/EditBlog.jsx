import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore imports
import { useParams, useNavigate } from 'react-router-dom'; // Use useParams to get the blog ID

export default function EditBlog() {
  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate(); // Initialize the navigate function
  const [blog, setBlog] = useState({ title: '', description: '', category: '', image: '', content: '' });
  const [loading, setLoading] = useState(true);
  
  // Fetch the blog data based on the ID
  useEffect(() => {
    const fetchBlog = async () => {
      const db = getFirestore();
      const blogRef = doc(db, 'blogs', id); // Reference to the specific blog
      const blogSnapshot = await getDoc(blogRef);

      if (blogSnapshot.exists()) {
        setBlog(blogSnapshot.data()); // Set the blog data in state
      } else {
        console.error('No such document!');
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  // Handle form submission to update the blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const blogRef = doc(db, 'blogs', id); // Reference to the specific blog

    try {
      await updateDoc(blogRef, blog); // Update the blog document
      alert('Blog updated successfully');
      navigate('/user/blogs'); // Redirect after updating
    } catch (error) {
      console.error('Error updating blog: ', error);
    }
  };

  if (loading) {
    return <p>Loading blog data...</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold text-center text-navy mb-8">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Description:</label>
          <textarea
            value={blog.description}
            onChange={(e) => setBlog({ ...blog, description: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Content:</label>
          <textarea
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Category:</label>
          <select
            value={blog.category}
            onChange={(e) => setBlog({ ...blog, category: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
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
        <div>
          <label className="block mb-2">Image URL:</label>
          <input
            type="text"
            value={blog.image}
            onChange={(e) => setBlog({ ...blog, image: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Update Blog
        </button>
      </form>
    </div>
  );
}
