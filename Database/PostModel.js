    import mongoose from "mongoose";

    const postSchema = new mongoose.Schema({
        content: {
            type: String,
            required: true,
        },
        user: { // Reference to the user who created the post
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Reference to the User model
        },
    });

    export default mongoose.models.Post || mongoose.model('Post', postSchema);
