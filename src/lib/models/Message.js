import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const messageSchema = new Schema(
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
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema)

export default Message