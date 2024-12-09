import mongoose, { Mixed, model } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IconvenientNearType extends mongoose.Document {
  convenientNearTypeId: string;
  name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const convenientNearTypeSchema = new Schema<IconvenientNearType>(
  {
    convenientNearTypeId: {
      type: String,
      required: true,
      index: { unique: true },
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
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
    collection: "ConvenientNearTypes",
  }
);

convenientNearTypeSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "convenientNearTypeId",
});

//Export the model

export default mongoose.model("convenientNearType", convenientNearTypeSchema);
