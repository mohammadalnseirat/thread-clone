import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import { handleErrors } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import Post from "../models/post.model.js";

// 1-Function to test the route:
export const test_get = (req, res, next) => {
  res.send("This is a test route");
};
// 7-Function To Get User Profile:
const getUserProfile_Get = async (req, res, next) => {
  //! We will fetch user profile either with username or userId
  //! query is either username or userId
  const { query } = req.params; //* query is either username or userId
  try {
    let user;
    if (mongoose.Types.ObjectId.isValid(query)) {
      // ?query is the userId
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      // ?query is the username
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt");
    }
    if (!user) {
      return next(handleErrors(404, "User Not Found!"));
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error Creating Get User Profile Api Route", error.message);
    next(error);
  }
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

// 3-Function to sign in a user:
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

// 4-Function to log out a user:
const logOut_Post = async (req, res, next) => {
  try {
    // ! remove the cookie:
    res.cookie("access_token", "", { maxAge: 1 });
    // ! send response:
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error Logging Out User", error.message);
    next(error);
  }
};

// 5-Function to follow/unfollow a user:
const followUnFollow_Post = async (req, res, next) => {
  try {
    const { id } = req.params;
    // !Find The User To Be Followed:
    const userToModified = await User.findById(id);
    // !Find The Logged In User(current User):
    const currentUser = await User.findById(req.user._id);
    if (id.toString() === req.user._id.toString()) {
      return next(handleErrors(400, "You Can't Follow Yourself!"));
    }
    //! check if there is a userToModified or currentUser:
    if (!userToModified || !currentUser) {
      return next(handleErrors(404, "User Not Found!"));
    }
    //! check if the userToModified is already followed by the currentUser:
    const isFollowed = currentUser.following.includes(id);
    if (isFollowed) {
      // !Unfollow The User:
      // ! Modify currentUser Following Array , Modify userToModified Followers Array:
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } }); // update followers array for the user,
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } }); // update following array for the currentUser
      res.status(200).json({ message: "Unfollowed Successfully" });
    } else {
      // !Follow The User:
      // ! Modify currentUser Following Array , Modify userToModified Followers Array:
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "Followed Successfully" });
    }
  } catch (error) {
    console.log("Error Following/Unfollowing User", error.message);
    next(error);
  }
};

// 6-Function to update user:
const updateUser_Put = async (req, res, next) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    // !check if user exists:
    if (!user) {
      return next(handleErrors(404, "User Not Found"));
    }
    // !check the user is owner or not:
    if (req.params.id !== userId.toString()) {
      return next(handleErrors(403, "You can only update your own profile"));
    }
    if (password) {
      const salt = await bcryptjs.genSalt(15);
      const hashedPassword = await bcryptjs.hash(password, salt);
      user.password = hashedPassword;
    }
    // !Update Profile Pic Using Cloudinary:
    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();
    //! Find all posts that this user replied and update username and userProfilePic fields
    await Post.updateMany(
      {
        "replies.userId": userId,
      },
      {
        $set: {
          "replies.$[reply].username": user.username,
          "replies.$[reply].userProfilePic": user.profilePic,
        },
      },
      {
        arrayFilters: [
          {
            "reply.userId": userId,
          },
        ],
      }
    );
    // !password must be null in response:
    user.password = null;
    res.status(200).json(user);
    //! Find all posts that this user replied and update username and userProfilePic fields
  } catch (error) {
    console.log("Error Creating Updating User Api Route", error.message);
    next(error);
  }
};

export {
  signUp_Post,
  signIn_Post,
  logOut_Post,
  followUnFollow_Post,
  updateUser_Put,
  getUserProfile_Get,
};
