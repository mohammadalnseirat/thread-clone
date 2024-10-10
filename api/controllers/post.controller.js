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
    // !Check The Image and Upload Image:
    if (image) {
      const uploadReponseImage = await cloudinary.uploader.upload(image);
      image = uploadReponseImage.secure_url;
    }
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

// 2-Function To Get Post:
const getPost_Get = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return next(handleErrors(404, "Post Not Found!"));
    }
    // ! send reponse back:
    res.status(200).json(post);
  } catch (error) {
    console.log("Error Getting Post Error:", error.message);
    next(error);
  }
};

// 3-Function To Delete Post:
const deletePost_Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return next(handleErrors(404, "Post Not Found!"));
    }
    //! check the Owner of post:
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return next(
        handleErrors(
          401,
          "Unauthorized, You are not allowed to delete this post!"
        )
      );
    }
    // // !check image and delete:
    // if (post.image) {
    //   const imagePuplicId = post.image.split("/").pop().split(".")[0];
    //   await cloudinary.uploader.destroy(imagePuplicId);
    // }
    // !delete the post:
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post has been Deleted  Successfully" });
  } catch (error) {
    console.log("Error Deleting Postr:", error.message);
    next(error);
  }
};

// 4-Function To Like/Unlike Post:
const likeUnLikePost_Post = async (req, res, next) => {
  const { id: postId } = req.params;
  const userId = req.user._id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return next(handleErrors(404, "Post Not Found!"));
    }
    // !check if the user already liked the post:
    const userLikedPost = post.likes.includes(userId.toString());
    if (userLikedPost) {
      // !unLike Post:
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post Unliked Successfully!" });
    } else {
      // !Like Post:
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
      await post.save();
      res.status(200).json({ message: "Post Liked Successfully!" });
    }
  } catch (error) {
    console.log("Error Creating Like/unlike post Api Route: ", error.message);
    next(error);
  }
};

// 5-Function To Reply Post:
const replyPost_Post = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;
    const { text } = req.body;

    if (!text || text === "") {
      returnnext(handleErrors(400, "Text is required!"));
    }
    // !Find the post:
    const post = await Post.findById(postId);
    if (!post) {
      return next(handleErrors(404, "Post Not Found!"));
    }
    //! create reply:
    const reply = {
      userId,
      userProfilePic,
      username,
      text,
    };
    // !save the reply to reply array:
    post.replies.push(reply);
    // !save the post:
    await post.save();
    // !send response back:
    res.status(200).json({
      message: "Reply added Successfully",
      post,
    });
  } catch (error) {
    console.log("Error Creating Reply Post Api Route:", error.message);
    next(error);
  }
};

// 6-Function To Get Feed Posts:
const getFeedPosts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    //! Find The User:
    const user = await User.findById(userId);
    if (!user) {
      return next(handleErrors(404, "User Not Found!"));
    }
    // !Get The Following Users That Current User Follows:
    const following = user.following;
    console.log(following);
    // !Get The Posts From The Following Users:
    const feedposts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });
    res.status(200).json(feedposts);
  } catch (error) {
    console.log("Error Creating Get Feed Posts Api Route:", error.message);
    next(error);
  }
};
export {
  createPost_Post,
  getPost_Get,
  deletePost_Delete,
  likeUnLikePost_Post,
  replyPost_Post,
  getFeedPosts,
};
