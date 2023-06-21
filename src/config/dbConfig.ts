import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.mongo_url!);
    const connection = mongoose.connection;
  } catch (error: any) {
    console.log(error);
  }
};
