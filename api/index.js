import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectMongoDataBase } from "./db/connectDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //! allows us to parse incoming requests:req.body
app.use(cors());

// Listen To The Port:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDataBase();
});

// Middleware To Handle Errors:
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success:false,
    message,
    statusCode
  })
})
