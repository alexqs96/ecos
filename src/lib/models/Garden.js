import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const GardenSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "Mi Jardin",
    },
    vegetables: [
      {
        data: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vegetable",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    width: {
      type: Number,
      required: true,
      default: 1,
    },
    height: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

const Garden = mongoose.models.Garden || mongoose.model("Garden", GardenSchema);

export default Garden;
