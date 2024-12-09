import mongoose, { Mixed, model } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IAccommodation extends mongoose.Document {
  accommodationTypeId: string;
  name: string;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const accommodationTypeSchema = new Schema<IAccommodation>(
  {
    accommodationTypeId: {
      type: String,
      required: true,
      index: { unique: true },
    },

    name: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "AccommodationTypes",
  }
);

accommodationTypeSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "accommodationTypeId",
});

export default mongoose.model("AccommodationTypes", accommodationTypeSchema);
