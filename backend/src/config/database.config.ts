import mongoose from "mongoose";
import { config } from "./app.config";

// Connect to the database
const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.log("Error connecting to MongoDB database");
    process.exit(1);
  }
};

export default connectDatabase;
