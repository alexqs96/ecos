import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
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
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.models.Messages || mongoose.model("Messages", messageSchema)

export default Message