import { Schema, model, models } from "mongoose";

export const vegetablesSchema = new Schema({
  slug: {
    type: String,
    required: true
  },
  name: {
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
    type: String,
    required: true,
  },
  space: {
    type: String,
    required: true,
  },
  harvest: {
    type: String,
    required: true,
  },
});

const Vegetable = models.Vegetable || model("Vegetable", vegetablesSchema);

export default Vegetable;
