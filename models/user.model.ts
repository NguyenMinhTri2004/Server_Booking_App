import mongoose from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IUser extends mongoose.Document {
  userId: string;
  // referrerId: string;
  email: string;
  password: string;
  name: string;
  authGoogleId: string;
  authFacebookId: string;
  authType: string;
  phoneNumber: string;
  sex: string;
  slug: string;
  status: number;
  userRole: string;
  isSendMail : boolean;
  isInvest: boolean;
  verifiedEmail: boolean;
  dateOfBirth: Date;
  verifiedGoogleAuthen: boolean;
  avatar: string;
  googleAuthen: boolean;
  active_at: string;
  verified_at: string;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
      index: { unique: true },
    },
    //   referrerId: {
    //     type: String,
    //     // required: true,
    //   },
    email: {
      type: String,
      // unique: true,
      // lowercase: true,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    verifiedGoogleAuthen: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    authGoogleId: {
      type: String,
      default: "",
    },
    authFacebookId: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
    },
    sex: {
      type: String,
    },
    slug: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    authType: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },

    userRole: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      // require: true,
    },
    isSendMail: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Number,
      // require: true,
      default: 1,
    },

    active_at: {
      type: String,
      default: "",
    },
    verified_at: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "User",
  }
);

userSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "userId",
});

//Export the model
// module.exports = mongoose.model('User', userSchema);

export default mongoose.model<IUser>("User", userSchema);
