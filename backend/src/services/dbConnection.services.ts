import env from "../utils/validateEnv"
import mongoose from "mongoose";

export default async () => {
    try {
        mongoose.connect(env.MONGO_CONNECTION_STRING)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error(error);
    }
};