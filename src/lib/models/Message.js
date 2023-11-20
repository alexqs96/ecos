import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const messageSchema = new Schema(
  {
    chatId: {
      type: String
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      default: ""
    },
    images:[{
      type: String
    }]
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema)

export default Message