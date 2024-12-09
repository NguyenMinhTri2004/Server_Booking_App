import mongoose from "mongoose";

const Schema = mongoose.Schema;

const googleAuthenSchema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    secret: {
      ascii: {
        type: String,
      },
      hex: {
        type: String,
      },
      base32: {
        type: String,
      },
      otpauth_url: {
        type: String,
      },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "GoogleAuthen",
  }
);

export default mongoose.model("GoogleAuthen", googleAuthenSchema);
