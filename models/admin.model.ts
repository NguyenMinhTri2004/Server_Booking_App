import bcrypt from "bcryptjs";
import mongoose from "mongoose";

interface admin extends mongoose.Document {
  email: string;
  password: string;
  verifiedEmail: boolean;
  userRole: string;
  status: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
  created_at: string;
  updated_at: string;
}

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
      // lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    verifiedEmail: {
      type: Boolean,
      default: true,
    },
    userRole: {
      type: String,
      enum: ["admin"],
      default: "admin",
      require: true,
    },
    status: {
      type: Number,
      require: true,
      default: 1,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "Admin",
  }
);

AdminSchema.pre("save", async function (next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHashed = await bcrypt.hash(this.password, salt);
    // Re-assign password hashed
    this.password = passwordHashed;
    this.email = this.email.toLowerCase();

    next();
  } catch (error) {
    next(error);
  }
});

AdminSchema.methods.comparePassword = async function (
  candidatePassword
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

export default mongoose.model<admin>("Admin", AdminSchema);
