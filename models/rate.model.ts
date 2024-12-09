import mongoose, { ObjectIdExpression } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IRate extends mongoose.Document {
  ratetId: string;
  start: number;
  userId: string;
  accomodationId: string;
  commentId: string;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

const rateSchema = new Schema<IRate>(
  {
    ratetId: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    accomodationId: {
      type: String,
      ref: "Commodation",
      required: true,
    },
    commentId: {
      type: String,
      ref: "Commodation",
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "Rates",
  }
);

rateSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "ratetId",
});

export default mongoose.model("Rate", rateSchema);
