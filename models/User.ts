import mongoose, { Schema, Document, Model, models, model } from "mongoose";

// 1️⃣ Define a TypeScript interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  userType: "mother_child" | "deaf_helper" | "autism_parent";
  createdAt: Date;
}

// 2️⃣ Create the schema
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Remember to hash this!
  userType: { 
    type: String, 
    required: true, 
    enum: ["mother_child", "deaf_helper", "autism_parent"],
  },
  createdAt: { type: Date, default: Date.now },
});

// 3️⃣ Export the model, handling hot reloads in Next.js
const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;
