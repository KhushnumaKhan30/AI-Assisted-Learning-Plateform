import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the structure of user accounts.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving a new or updated password.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// Create the User model from the schema.
const User = mongoose.model("User", userSchema);

export default User;