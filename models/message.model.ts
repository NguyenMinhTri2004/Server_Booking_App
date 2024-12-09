import mongoose, { ObjectIdExpression } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IMessage extends mongoose.Document {
  messageId: string;
  orderId: string;
  senderId: string;
  receiverId: string;
  text: string;
  media: [string];
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

const messageSchema = new Schema<IMessage>(
  {
    messageId: {
      type: String,
      require: true,
    },
    orderId: {
      type: String,
      ref: "Order",
      require: true,
    },
    senderId: {
      type: String,
      ref: "User",
      require: true,
    },
    receiverId: {
      type: String,
      require: true,
    },
    text: {
      type: String,
    },
    media: {
      type: [String],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "Messages",
  }
);

messageSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "messageId",
});

export default mongoose.model("Message", messageSchema);
