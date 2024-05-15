import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const otpVerificationEmailSchema = new Schema(
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
      require: true,
    },
    expired_at: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'OTPVerificationEmail',
  }
);

export default mongoose.model('OTPVerificationEmail', otpVerificationEmailSchema);
