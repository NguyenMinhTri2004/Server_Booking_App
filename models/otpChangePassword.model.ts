import mongoose from "mongoose";

const Schema = mongoose.Schema;

const otpChangePasswordSchema = new Schema(
  {
    value: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    used: {
      type: Boolean,
      required: true,
    },
    expired_at: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "OTPChangePassword",
  }
);

export default mongoose.model("OTPChangePassword", otpChangePasswordSchema);
