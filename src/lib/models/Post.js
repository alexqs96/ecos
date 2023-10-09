import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: [{
      type: String
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    }]
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.models.Post || mongoose.model("Posts", postSchema)

export default Post