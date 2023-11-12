import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: ""
    },
    location: {
      country: {
        type: String,
        default: ""
      },
      city: {
        type: String,
        default: ""
      }
    },
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }],
    chats: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    }],
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }],
    trades: [{
      type: String
    }],
    badges: [{
      type: String
    }]
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User