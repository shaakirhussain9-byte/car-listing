import bcryptjs from "bcryptjs";
import User from "../Model/User.Model.js";
import jwt from "jsonwebtoken";

// ================= SIGN UP =================
export const Signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // validation
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // response (no password)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ================= SIGN IN =================
export const Signing = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false, // 👉 added
        message: "Email and password are required",
      });
    }

    // check user
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({
        success: false, // 👉 added
        message: "User not found",
      });
    }

    // check password (FIX muhiim ah)
    const isMatch = await bcryptjs.compare(password, validUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false, // 👉 added
        message: "Invalid credentials",
      });
    }

    // create token
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // remove password from response
    const { password: pass, ...rest } = validUser._doc;

    // send cookie + response
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict"   })
      .status(200)
      .json({
        success: true,
        user: rest,
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false, // 👉 added
      message: "Server error",
    });
  }
};