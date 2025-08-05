// components/BlogCard.js
import React from "react";
import axios from "axios";

const BlogCard = ({ blog, onLike }) => {
  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/${blog._id}/like`);
      onLike(); // Refresh blog list after liking
    } catch (error) {
      console.error("Error liking the blog:", error.message);
    }
  };

  return (
    <div className="card m-3 shadow-sm">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="card-img-top"
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.content}</p>
        <p className="text-muted">
          <strong>Author:</strong> {blog.author?.username || "Unknown"}
        </p>
        <button className="btn btn-sm btn-primary" onClick={handleLike}>
          👍 Like ({blog.likes || 0})
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
