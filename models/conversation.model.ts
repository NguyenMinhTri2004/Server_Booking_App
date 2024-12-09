import mongoose, { ObjectIdExpression } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IConversation extends mongoose.Document {
  conversationId: string;
  userId: string;
  participants: [string];
  title: string;
  type: string;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

const conversationSchema = new Schema<IConversation>(
  {
    conversationId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    participants: {
      type: [String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "Conversations",
  }
);

conversationSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "conversationId",
});

export default mongoose.model("Conversation", conversationSchema);
