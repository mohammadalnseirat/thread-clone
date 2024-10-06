import User from "../models/user.model.js";
import { handleErrors } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    // get the token from the browser:
    const token = req.cookies.access_token;
    // ! check if there is token:
    if (!token) {
      return next(handleErrors(401, "Unauthorized, No token Provided!"));
    }
    // ! verify the token and check if is it valid or not:
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return next(handleErrors(401, "Unauthorized, Invalid Token!"));
    }
    // ! get the user from the token:
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(handleErrors(404, "User Not Found"));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error to Verify Token", error.message);
    next(error);
  }
};
