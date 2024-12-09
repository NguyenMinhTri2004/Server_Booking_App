import mongoose, { Mixed, model } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IService extends mongoose.Document {
  serviceId: string;
  name: string;
  status: string;
  typeServiceId: string;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const serviceSchema = new Schema<IService>(
  {
    serviceId: {
      type: String,
      required: true,
      index: { unique: true },
    },
    name: {
      type: String,
      required: true,
    },
    typeServiceId: {
      type: String,
      required: true,
      ref: "ServiceTypes",
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
    collection: "Services",
  }
);

serviceSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "serviceId",
});

//Export the model

export default mongoose.model("Service", serviceSchema);
