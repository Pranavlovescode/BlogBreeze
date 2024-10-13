import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Firestore imports
import BlogCard from '../components/BlogCard'; // Assuming BlogCard is in the same folder

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs for the logged-in user
  useEffect(() => {
    const fetchBlogs = async () => {
      const db = getFirestore(); // Initialize Firestore
      const username = localStorage.getItem('username'); // Get username from local storage

      if (!username) {
        alert('User not logged in');
        return;
      }

      try {
        // Query Firestore for blogs where the username matches
        const q = query(collection(db, 'blogs'), where('username', '==', username));
        const querySnapshot = await getDocs(q);
        const userBlogs = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(),
        }));

        setBlogs(userBlogs); // Set the fetched blogs in state
      } catch (error) {
        console.error('Error fetching blogs: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Function to handle blog deletion
  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Do you want to delete this blog?");
    if (confirmDelete) {
      const db = getFirestore(); // Initialize Firestore
      try {
        await deleteDoc(doc(db, 'blogs', blogId)); // Delete the blog document
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId)); // Remove blog from state
        console.log(`Blog with ID ${blogId} deleted successfully`);
      } catch (error) {
        console.error("Error deleting blog: ", error);
      }
    }
  };

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (blogs.length === 0) {
    return <p>No blogs found for this user.</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold text-center text-navy mb-8">My Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} onDelete={handleDelete} /> // Pass the blog data and delete function to BlogCard component
        ))}
      </div>
    </div>
  );
}
