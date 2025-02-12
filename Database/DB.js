import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const mongoDBUrl = process.env.MONGODB_URI;

if (!mongoDBUrl) {
  throw new Error("MONGODB_URI environment variable is not defined.");
}

export default async function connectDB() {
  try {
    await mongoose.connect(mongoDBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });

    connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process if the connection fails
  }
}

// Call connectDB only if this file is run directly (for testing purposes)
if (require.main === module) {
  connectDB();
}