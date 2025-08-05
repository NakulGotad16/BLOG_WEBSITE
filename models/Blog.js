import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  image:   { type: String },
  content: { type: String, required: true },
  author:  { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
  likes:   { type: Number, default: 0 },
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
