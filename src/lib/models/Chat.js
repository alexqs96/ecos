import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    lastMessage: {
      type: String
    },
    seen: {
      type: Boolean,
      default: false
    },
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    }],
  },
  {
    timestamps: true,
  },
);

const Chat = mongoose.models.Chats || mongoose.model("Chats", chatSchema)

export default Chat