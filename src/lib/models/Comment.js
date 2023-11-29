import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const commentSchema = new Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    image: {
      type: String
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }]
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment