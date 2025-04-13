import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


// signup
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "User already exists"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const { password: pass, ...userData } = newUser._doc;
    res.status(201).json({
      message: "User created successfully",
      user: userData,
    });
  } catch (error) {
    next(errorHandler(500, "Signup failed: " + error.message));
  }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...userData } = validUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({
        message: "Signed in successfully",
        user: userData,
      });
  } catch (error) {
    next(errorHandler(500, 'Signin failed: ' + error.message));
  }
};


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...userData } = user._doc;

      return res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json({
          message: "Google sign-in successful",
          user: userData,
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const username =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new User({
        username,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...userData } = newUser._doc;

      return res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json({
          message: "Google sign-up successful",
          user: userData,
        });
    }
  } catch (error) {
    next(errorHandler(500, 'Google auth failed: ' + error.message));
  }
};

export const logout = (req, res) => {
  res.clearCookie('access_token');
  res.status(200).json({ message: 'Logged out successfully' });
};

