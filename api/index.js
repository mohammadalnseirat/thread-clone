import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongoDataBase } from "./db/connectDB.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //! allows us to parse incoming requests:req.body
app.use(express.urlencoded({ extended: true })); //! allows us to parse Form Data to req.body
app.use(cookieParser()); // ! allows us to parse Cookies
app.use(cors());

// Routes:
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

// Listen To The Port:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDataBase();
});

// Middleware To Handle Errors:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
