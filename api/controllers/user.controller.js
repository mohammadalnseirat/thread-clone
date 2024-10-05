import User from "../models/user.model.js";
import { handleErrors } from "../utils/error.js";

// 1-Function to test the route:
export const test_get = (req, res, next) => {
  res.send("This is a test route");
};
