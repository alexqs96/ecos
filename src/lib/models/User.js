import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
      ref: "Users",
    }],
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    }],
    chats: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
    }],
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
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

const User = mongoose.models.Users || mongoose.model("Users", userSchema)

export default User