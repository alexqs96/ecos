import { connect, connection, set } from "mongoose";

export const connectMongo = async () => {
  if (connection.readyState === 1 || connection.readyState === 2) {
    console.log("MongoDB");
    return;
  }

  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("MongoDB Error: " + error);
  }
  set("strictQuery", false);
};
