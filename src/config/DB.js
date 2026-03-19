import mongoose from "mongoose";
import config from "./config.js";

const ConnectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
        process.exit(1)
    }
}


export default ConnectDB