import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const mongoDBUrl = process.env.MONGODB_URI;

if (!mongoDBUrl) {
    throw new Error("MONGODB_URI environment variable is not defined.");
}

export async function connectDB() {
    try {
        if (mongoose.connection.readyState === 0) { // Check if not already connected
            await mongoose.connect(mongoDBUrl, {
                serverSelectionTimeoutMS: 5000,
            });

            const connection = mongoose.connection;

            connection.on("connected", () => {
                console.log("MongoDB connected successfully");
            });

            connection.on("error", (error) => {
                console.error("MongoDB connection error:", error);
            });

            connection.on("disconnected", () => {
                console.log("MongoDB disconnected");
            });
        }
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}