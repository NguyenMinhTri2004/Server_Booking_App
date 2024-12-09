import mongoose, { Mixed, model } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IRoomType extends mongoose.Document {
  roomTypeId: string;
  accommodationId: string;
  accommodationSlug: string;
  name: string;
  price: number;
  convenients: [];
  adult: number;
  children: number;
  status: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const roomTypeSchema = new Schema<IRoomType>(
  {
    roomTypeId: {
      type: String,
      required: true,
      index: { unique: true },
    },
    accommodationId: {
      type: String,
      required: true,
      ref: "Accommodation",
    },
    accommodationSlug: {
      type: String,
      required: true,
      ref: "Accommodation.slug",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    convenients: {
      type: [],
      required: true,
    },
    adult: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    quantity: {
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
    collection: "RoomTypes",
  }
);

roomTypeSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "roomTypeId",
});

//Export the model

export default mongoose.model("roomType", roomTypeSchema);
