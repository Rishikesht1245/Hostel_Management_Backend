import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI as string || 'mongodb+srv://rishikeshtharayil:0YhEX4uvpZcTz1ab@cluster0.4tuvlcb.mongodb.net/?retryWrites=true&w=majority',
      {
        // use new mongoDB connection string parser
        useNewUrlParser: true,
        //engine
        useUnifiedTopology: true,
        dbName: "HostelManagement",
      } as ConnectOptions
    );
    console.log("database connected");
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export default connectDB;
