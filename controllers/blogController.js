import Blog from "../models/Blog.js";

// 📖 Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username"); // fetch blogs with author name
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✍️ Create a new blog
export const createBlog = async (req, res) => {
  const { title, image, content, author } = req.body;

  try {
    const blog = await Blog.create({ title, image, content, author });
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📝 Update a blog
export const updateBlog = async (req, res) => {
  const { title, image, content } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title;
    blog.image = image;
    blog.content = content;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.remove();
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 👍 Like a blog
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.likes = (blog.likes || 0) + 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};
