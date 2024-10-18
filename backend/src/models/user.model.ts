import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        select: false,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

export type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);