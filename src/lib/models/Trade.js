import mongoose from "mongoose";

const TradeSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: [{
      type: String
    }],
  },
  {
    timestamps: true,
  },
);

const Trade = mongoose.models.Trades || mongoose.model("Trades", TradeSchema)

export default Trade