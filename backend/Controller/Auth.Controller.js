import bcryptjs from "bcryptjs";
import User from "../Model/User.Model.js";
import jwt from "jsonwebtoken";

// ================= SIGNUP =================
export const Signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    // check fields
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check user
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

    // response ✅ (MUHIIM)
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
    res.status(500).json({   // ❗ FIX: ha isticmaalin next(error) kaliya
      success: false,
      message: error.message,
    });
  }
};

// ================= SIGNIN =================
export const Signing = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });

    // ❗ FIX: error handling
    if (!validUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ❗ FIX: compareSync sax
    const isMatch = bcryptjs.compareSync(password, validUser.password);

    // ❗ FIX: condition khaldan ayaa jiray
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // remove password
    const { password: pass, ...rest } = validUser._doc;

    // ❗ FIX: JWT_SECRET spelling
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ❗ FIX: httpOnly spelling
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};