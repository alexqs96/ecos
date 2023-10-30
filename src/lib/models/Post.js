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
      default: ""
    },
    images: [{
      type: String
    }],
    category: {
      type: String,
      default: "post"
    },
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

const Post = mongoose.models.Posts || mongoose.model("Posts", postSchema)

export default Post