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
    photo: {
      type: String,
      default: "default_profile.png",
    },
    banner: {
      type: String,
      default: "default_banner.png",
    },
    about: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
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

const User = mongoose.models.User || mongoose.model("Users", userSchema)

export default User