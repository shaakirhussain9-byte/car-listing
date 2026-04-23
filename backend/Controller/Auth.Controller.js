import bcryptjs from "bcryptjs";
import User from "../Models/user.Model.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  // let's get the data from req.body
  const { username, password, email } = req.body;
  // let's hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // let's save the user data into an object
  const newUser = new User({ username, password: hashedPassword, email });

  // let's save the user to the mongoDB
  try {
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User saved successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    // check if the user exists or not
    if (!validUser) return next(404, "User not found");

    // if the user exist, let's check their password
    const isMatch = bcryptjs.compareSync(password, validUser.password);

    // if the password doesn't match
    if (!isMatch) return next(401, "Invalid credentials");

    // let's create token for the user

    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign(
      { id: validUser.id, username: validUser.username },
      process.env.JWT_SECRET
    );
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// function for google oauth
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // hash the password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // generated username
      const username =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const newUser = new User({
        username,
        password: hashedPassword,
        email: req.body.email,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error.message);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "User signed out" });
  } catch (error) {
    next(error);
  }
};