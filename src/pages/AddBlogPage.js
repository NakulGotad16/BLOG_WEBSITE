// pages/AddBlogPage.js
import React, { useState } from "react";
import axios from "axios";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  // ✅ Assume you're storing logged-in user in localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("You must be logged in to add a blog.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/blogs", {
        title,
        image,
        content,
        author: user._id, // ✅ Real user ID from localStorage
      });

      setTitle("");
      setImage("");
      setContent("");
      alert("✅ Blog Added Successfully");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("❌ Failed to add blog");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="form-control mb-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="form-control mb-2"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;

