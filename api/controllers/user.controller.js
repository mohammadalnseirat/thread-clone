import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import { handleErrors } from "../utils/error.js";
import bcryptjs from "bcryptjs";

// 1-Function to test the route:
export const test_get = (req, res, next) => {
  res.send("This is a test route");
};

// 2-Function to sign up a new user:
const signUp_Post = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    if (
      !name ||
      !username ||
      !email ||
      !password ||
      name === "" ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(handleErrors(400, "all fields are required!"));
    }

    //! check if the email Correct:
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return next(
        handleErrors(400, "Invalid Email,Please Enter A Valid Email!")
      );
    }
    const user = await User.findOne({ $or: [{ username }, { email }] });
    //! check if user already exists:
    if (user) {
      return next(handleErrors(400, "User Already Exists!"));
    }
    //! check the password:
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(password) || password.length < 8) {
      return next(
        handleErrors(
          400,
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
        )
      );
    }

    //! hash the password:
    const hashedPassword = bcryptjs.hashSync(password, 15);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //! generate token:
      generateTokenAndSetCookie(newUser._id, res);
      //! save user:
      await newUser.save();
      const { password, ...rest } = newUser._doc;
      res.status(201).json(rest);
    } else {
      return next(handleErrors(400, "Invalid User Data!"));
    }
  } catch (error) {
    console.log("Error Creating Sign Up User", error.message);
    next(error);
  }
};

// 2-Function to sign in a user:
const signIn_Post = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password || username === "" || password === "") {
      return next(handleErrors(400, "all fields are required!"));
    }
    const user = await User.findOne({ username });
    // ! check if user not exists:
    if (!user) {
      return next(handleErrors(404, "User Not Found,Please Sign Up First!"));
    }
    const isMatchPawword = bcryptjs.compareSync(password, user?.password || "");
    // ! check if password is match:
    if (!isMatchPawword) {
      return next(handleErrors(400, "Invalid Credentials!"));
    }

    // ! generate token:
    generateTokenAndSetCookie(user._id, res);
    // ! send response:
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log("Error Creating Sign In User", error.message);
    next(error);
  }
};
export { signUp_Post, signIn_Post };
