import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true },
    name: String,
    email: String,
    avatar: String,
    theme: {
      mode: { type: String, default: "light" },
      accent: { type: String, default: "blue" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);