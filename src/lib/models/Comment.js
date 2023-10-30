import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String
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

const Comment = mongoose.models.Comments || mongoose.model("Comments", commentSchema)

export default Comment