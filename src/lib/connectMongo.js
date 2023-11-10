import { connect, connection, model, set } from "mongoose";
import { commentSchema } from "./models/Comment";

export const connectMongo = async () => {
  if (connection.readyState === 1 || connection.readyState === 2) {
    console.log("Mongo DB");
    return;
  }

  try {
    await connect(process.env.MONGO_URI);
    model('Comments', commentSchema);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("MongoDB Error: " + error);
  }
  set("strictQuery", false);
};
