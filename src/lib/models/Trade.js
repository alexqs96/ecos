import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const TradeSchema = new Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Trade = mongoose.models.Trade || mongoose.model("Trade", TradeSchema)

export default Trade