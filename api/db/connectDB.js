import mongoose from "mongoose";

export const connectMongoDataBase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1); // Exit process with error code 1
  }
};
