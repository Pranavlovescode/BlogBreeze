import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import BlogCard from "../components/BlogCard";
import { div } from "framer-motion/client";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  const username = localStorage.getItem("username");
  useEffect(() => {
    const fetchBlogs = async () => {
      const db = getFirestore();

      if (!username) {
        // alert("User not logged in");
        return;
      }

      try {
        const q = query(
          collection(db, "blogs"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);
        const userBlogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(userBlogs);
      } catch (error) {
        setError("Error fetching blogs");
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Do you want to delete this blog?");
    if (confirmDelete) {
      const db = getFirestore();
      try {
        await deleteDoc(doc(db, "blogs", blogId));
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        console.log(`Blog with ID ${blogId} deleted successfully`);
      } catch (error) {
        setError("Error deleting blog");
        console.error("Error deleting blog: ", error);
      }
    }
  };

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category === selectedCategory)
    : blogs;

  if (loading) {
    // return <p>Loading blogs...</p>;
  }

  return (
    <div>
      {username ? (
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-semibold text-center text-navy mb-8">
            My Blogs
          </h1>
          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-lg font-medium mb-2"
            >
              Filter by Category:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded"
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

          {filteredBlogs.length === 0 && selectedCategory ? (
            <p>No blogs found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Typography variant="h6" color="textSecondary">
          Please login to view your Blogs
        </Typography>
      )}
    </div>
  );
}
