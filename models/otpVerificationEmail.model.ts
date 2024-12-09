import mongoose from "mongoose";

export interface IOptVerificationEmail extends mongoose.Document {
  value: Number;
  userId: string;
  used: boolean;
  expiredAt: Date;
  status: Boolean;
  email: string;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

const otpVerificationEmailSchema = new Schema<IOptVerificationEmail>(
  {
    value: {
      type: Number,
      require: true,
    },
    userId: {
      type: String,
      require: false,
    },
    used: {
      type: Boolean,
      default: false,
      require: false,
    },
    // expiredAt: {
    //   type: Date,
    //   default: Date.now(),
    //   expires: 60,
    //   require: false,
    // },
    status: {
      type: Boolean,
      require: false,
    },
    email: {
      type: String,
      require: true,
    },
    created_at: {
      type: String,
      required: false,
    },

    updated_at: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "OTPVerificationEmails",
  }
);

export default mongoose.model(
  "OTPVerificationEmail",
  otpVerificationEmailSchema
);
