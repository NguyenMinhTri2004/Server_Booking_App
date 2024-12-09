import mongoose, { Mixed, model } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IconvenientNear extends mongoose.Document {
  convenientNearId: string;
  name: string;
  status: string;
  typeConvenientNearId: string;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const convenientNearSchema = new Schema<IconvenientNear>(
  {
    convenientNearId: {
      type: String,
      required: true,
      index: { unique: true },
    },
    name: {
      type: String,
      required: true,
    },
    typeConvenientNearId: {
      type: String,
      required: true,
      ref: "convenientNearTypes",
    },
    status: {
      type: String,
      required: true,
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
    collection: "ConvenientNears",
  }
);

convenientNearSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "convenientNearId",
});

//Export the model

export default mongoose.model("convenientNear", convenientNearSchema);
