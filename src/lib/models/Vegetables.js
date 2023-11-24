import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const vegetablesSchema = new Schema({
  slug: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  depth: {
    type: String,
    required: true,
  },
  sun: {
    type: String,
    required: true,
  },
  water: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  germination: {
    type: String,
    required: true,
  },
  cool: {
    type: Boolean,
    required: true,
    default: false
  },
  space: {
    type: Number,
    required: true,
  },
  harvest: {
    type: String,
    required: true,
  },
});

const Vegetable = mongoose.models.Vegetable || mongoose.model("Vegetable", vegetablesSchema);

export default Vegetable;
