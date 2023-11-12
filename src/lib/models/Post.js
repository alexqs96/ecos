import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const postSchema = new Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post