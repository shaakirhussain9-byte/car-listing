import bcryptjs from "bcryptjs";
import User from "../Model/User.Model.js";


export const Signup = async (req, res, next) => {
  try {
    // Get data from req.body
    const { username, password, email } = req.body;

    // Check required fields
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save to database
    const savedUser = await newUser.save();

    // Send response (without password)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });

  } catch (error) {
    next(error)
  
  }
};