import cloudinary from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { handleErrors } from "../utils/error.js";
// 1-Function To Create Post:
const createPost_Post = async (req, res, next) => {
  try {
    const { postedBy, text } = req.body;
    let { image } = req.body;
    //! Check The Fields:
    if (!text || !postedBy) {
      return next(handleErrors(400, "postedBy and Text fields are required!"));
    }

    // !Find The User Based On The PostedBy Field:
    const user = await User.findById(postedBy);
    if (!user) {
      return next(handleErrors(404, "User Not Found!"));
    }
    if (user._id.toString() !== req.user._id.toString()) {
      return next(
        handleErrors(400, "Unauthorized, You are not allowed to create post!")
      );
    }
    // !Check The Text:
    const maxLength = 500;
    if (text.length > maxLength) {
      return next(
        handleErrors(
          400,
          `Text is too long, should be less than ${maxLength} characters!`
        )
      );
    }
    // // !Check The Image and Upload Image:
    // if (image) {
    //   const uploadReponseImage = await cloudinary.uploader.upload(image);
    //   image = uploadReponseImage.secure_url;
    // }
    // !Create The Post:
    const newPost = new Post({
      postedBy,
      text,
      image,
    });
    // !Save The Post and send response back:
    const savedPost = await newPost.save();
    res.status(200).json({
      message: "Post Created Successfully",
      savedPost,
    });
  } catch (error) {
    console.log("Error Creating Post Api Route:", error.message);
    next(error);
  }
};

export { createPost_Post };
