import React, { useState, useEffect, useRef } from "react";
import BlogCardHome from "../components/BlogCardHome";
import { Link } from "react-router-dom";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing icons
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Firestore imports

const PAGE_SIZE = 6; // Number of blogs per page

function Home() {
  const [blogs, setBlogs] = useState([]); // State to store all blogs
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store selected category
  const scrollRef = useRef(null); // Reference for scrolling

  // Function to fetch blogs from Firestore
  const fetchBlogs = async () => {
    const db = getFirestore(); // Initialize Firestore
    try {
      const querySnapshot = await getDocs(collection(db, "blogs")); // Fetch all blogs
      const blogsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsData); // Set fetched blogs to state
    } catch (error) {
      console.error("Error fetching blogs: ", error);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Fetch blogs on component mount
  }, []);

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Filter blogs based on search input and selected category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate total pages based on filtered blogs
  const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE);

  // Get blogs for the current page
  const blogsToDisplay = filteredBlogs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Function to go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to go to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Latest blogs (last 6 blogs)
  const latestBlogs = blogs.slice(0, 6);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 20; // Adjust the scroll amount
        if (
          scrollRef.current.scrollTop >=
          scrollRef.current.scrollHeight - scrollRef.current.clientHeight
        ) {
          scrollRef.current.scrollTop = 0; // Reset to top when reaching the end
        }
      }
    }, 200); // Adjust the speed of scrolling

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-navy">
      <div className="container mx-auto py-8 px-4">
        {/* Search Bar */}
        <div className="flex items-center bg-navy p-0.5 rounded-full mb-8">
          <input
            type="text"
            placeholder="Search Blogs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 rounded-l-full bg-white text-navy focus:outline-none"
          />
          <button className="bg-navy text-white px-4 py-2 rounded-r-full hover:bg-lightblue flex items-center justify-center">
            <FaSearch />
          </button>
        </div>

        {/* Blog Cards */}
        <div className="flex flex-col lg:flex-row">
          {/* Main blog section */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogsToDisplay.length > 0 ? (
                blogsToDisplay.map((blog) => (
                  <Link key={blog.id} to={`/blog/${blog.id}`}>
                    <BlogCardHome blog={blog} />
                  </Link>
                ))
              ) : (
                <p>No blogs found.</p>
              )}
            </div>

            {/* Icon-Based Pagination Controls */}
            <div className="flex justify-center mt-8 mb-4">
              <button
                onClick={handlePrevPage}
                className={`mr-2 p-2 rounded-full bg-navy text-white ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-lightblue"
                }`}
                disabled={currentPage === 1}
              >
                <FaChevronLeft size={8} />
              </button>
              <span className="px-4 py-2 text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                className={`ml-2 p-2 rounded-full bg-navy text-white ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-lightblue"
                }`}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight size={8} />
              </button>
            </div>
          </div>

          {/* Sidebar for categories */}
          <div className="w-full lg:w-1/4 mt-8 lg:mt-0 lg:ml-4">
            <div className="bg-navy text-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul>
                {[
                  "Travel",
                  "Fashion",
                  "Cooking",
                  "Technology",
                  "Health",
                  "DIY",
                  "Photography",
                ].map((category) => (
                  <li
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`mb-2 cursor-pointer hover:text-blue-200 ${
                      selectedCategory === category
                        ? "font-bold text-blue-200"
                        : ""
                    }`}
                  >
                    {category}
                  </li>
                ))}
                <li
                  onClick={() => handleCategoryClick("")}
                  className={`mb-2 cursor-pointer hover:text-blue-200 ${
                    selectedCategory === "" ? "font-bold text-blue-200" : ""
                  }`}
                >
                  Show All
                </li>
              </ul>
            </div>

            {/* Latest Blog Section with Scrolling Effect */}
            <div className="bg-white mt-8 p-4 rounded-lg shadow-lg border border-navy overflow-hidden">
              <h2 className="text-xl font-semibold mb-1 p-2 bg-navy text-white rounded-lg">
                Latest Blogs🔥
              </h2>

              <div className="h-64 overflow-hidden" ref={scrollRef}>
                <ul>
                  {latestBlogs.map((blog) => (
                    <li
                      key={blog.id}
                      className="flex items-start my-2 p-2 rounded-lg hover:bg-blue-200"
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-16 h-16 rounded-lg mr-2 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-sm md:text-base">{blog.title}</h3>
                        <p className="text-gray-600 text-xs md:text-sm">{blog.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
