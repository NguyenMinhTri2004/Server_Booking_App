import mongoose, { ObjectIdExpression } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface ICard extends mongoose.Document {
  cardId: string;
  userId : string;
  nameOwner: string;
  number : string;
  expireDay : Date;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

const cardSchema = new Schema<ICard>(
  {
    cardId: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      ref: "User",
      required: true,
    },

    nameOwner: {
      type: String,
      required: false,
    },

    number : {
      type : String,
      required : false
    },

    expireDay: {
      type: Date,
      required: false,
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "Cards",
  }
);

cardSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "cardId",
});

export default mongoose.model("Card", cardSchema);
