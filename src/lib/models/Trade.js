import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const TradeSchema = new Schema(
  {
    from: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      vegetables: [
        {
          name: {
            type: String,
            default: "Otro",
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
    to: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      vegetables: [
        {
          name: {
            type: String,
            default: "Otro",
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
    participants: [
      {
        type: String,
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    accepted: {
      you: {
        type: Boolean,
        default: false,
      },
      other: {
        type: Boolean,
        default: false,
      },
    },
    decline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Trade = mongoose.models.Trade || mongoose.model("Trade", TradeSchema);

export default Trade;
