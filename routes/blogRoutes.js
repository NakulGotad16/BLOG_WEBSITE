import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.put("/:id/like", likeBlog);

export default router;
