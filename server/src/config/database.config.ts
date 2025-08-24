import mongoose from "mongoose";

const mongoDB = async (url: string) => {
  try {
    const connect = await mongoose.connect(url);
    console.log(`Connected to Mongo Database: ${connect.connection.host}...`);
  } catch (error: any) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default mongoDB;
