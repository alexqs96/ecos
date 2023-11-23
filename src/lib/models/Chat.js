import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const chatSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    receiver:{
      type: String,
      required: true
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hide: {
      type: Boolean,
      default: false
    },
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
    type:{
      type: String,
      default: "friends"
    }
  },
  {
    timestamps: true,
  },
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
