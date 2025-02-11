import mongoose from "mongoose";

// Define the User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',  // Reference to the Post model
    }],
});

// If the User model doesn't exist, it will be created; otherwise, it will be reused.
export default mongoose.models.User || mongoose.model('User', userSchema);
