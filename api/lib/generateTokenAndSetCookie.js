import jwt from "jsonwebtoken";
export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d", // 15 days
  });
  res.cookie("access_token", token, {
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
