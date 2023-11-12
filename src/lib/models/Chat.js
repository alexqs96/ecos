import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const chatSchema = new Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      ref: "Message",
    }],
  },
  {
    timestamps: true,
  },
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema)

export default Chat