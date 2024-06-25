import mongoose, { mongo } from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("already conected to mongo");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    connected = true;
    console.log("connected to db");
  } catch (err) {
    console.log("error occurred: ", err);
  }
};

export default connectDB;
