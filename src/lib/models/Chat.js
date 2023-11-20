import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const chatSchema = new Schema(
  {
    userOne: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userTwo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: String,
        required: true,
      },
    ],
    hide: [
      {
        type: String,
        required: true,
      },
    ],
    you: {
      type: Boolean,
      default: false,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
