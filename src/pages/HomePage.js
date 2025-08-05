// pages/HomePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to load blogs:", error.message);
    }
  };


  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Blogs</h2>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-6 col-lg-4" >
            <BlogCard key={blog._id} blog={blog} onLike={fetchBlogs} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
