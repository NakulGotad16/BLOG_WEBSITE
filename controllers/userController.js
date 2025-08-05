import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  try {
    // 🔍 Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 🧼 Remove password before sending response
    const { password: pwd, ...userWithoutPassword } = user._doc;

    res.status(201).json({
      message: "Registration successful",
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);
  const user = await User.findOne({ email, password });
   try {
    // 🔍 Find user by email
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "User not found" });

    // 🔑 Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // ✅ Remove password before sending user info
    const { password: pwd, ...userWithoutPassword } = user._doc;

    // 💡 You can also add a JWT token here if needed
    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};