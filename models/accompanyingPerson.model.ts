import mongoose, { ObjectIdExpression } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IAccompanyingPerson extends mongoose.Document {
  accompanyingPersonId: string;
  userId : string;
  name: string;
  birthday : Date
  gender : number,
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

const accompanyingPersonSchema = new Schema<IAccompanyingPerson>(
  {
    accompanyingPersonId: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: false,
    },

    birthday: {
      type: Date,
      required: false,
    },

    gender: {
      type: Number,
      enum: [0,1,2], // 0: male, 1: female
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "AccompanyingPersons",
  }
);

accompanyingPersonSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "accompanyingPersonId",
});

export default mongoose.model("AccompanyingPerson", accompanyingPersonSchema);
