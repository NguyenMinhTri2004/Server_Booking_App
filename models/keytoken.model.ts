import { Collection, Schema } from "mongoose";

const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },

    privateKey: {
      type: String,
      required: true,
    },

    publicKey: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
    },
    refreshTokensUsed: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "Keys",
  }
);

//Export the model
export default mongoose.model("Key", keyTokenSchema);
