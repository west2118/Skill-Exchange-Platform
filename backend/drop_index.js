import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dropIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const collection = db.collection("users");

    // Check if index exists before dropping
    const indexes = await collection.indexes();
    const hasUidIndex = indexes.some(index => index.name === "uid_1");

    if (hasUidIndex) {
      await collection.dropIndex("uid_1");
      console.log("Dropped uid_1 index successfully!");
    } else {
      console.log("Index uid_1 does not exist.");
    }
    
    // Also drop it from UserSchema if it was cached
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

dropIndex();
