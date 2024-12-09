import mongoose, { Mixed, model } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IroomAvailable extends mongoose.Document {
  roomAvailableId: string;
  value: number;
  userId: string;
  accommodationId: string;
  roomAvailableReservation: [];
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const roomAvailableSchema = new Schema<IroomAvailable>(
  {
    roomAvailableId: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    accommodationId: {
      type: String,
      ref: "Accommodation",
      required: true,
    },
    roomAvailableReservation: {
      type: [],
      required: false,
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
    collection: "RoomAvailables",
  }
);

roomAvailableSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "roomAvailableId",
});

//Export the model

export default mongoose.model("RoomAvailable", roomAvailableSchema);
