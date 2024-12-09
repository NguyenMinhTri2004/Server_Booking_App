import mongoose, { ObjectIdExpression } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IComment extends mongoose.Document {
  commentId: string;
  content: string;
  tag: Object;
  reply: string;
  emotios: [];
  userId: string;
  media: [string];
  commentRight: number;
  commentLeft: number;
  commentParentId: string;
  isDeleted: boolean;
  accomodationId: string;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

const commentSchema = new Schema<IComment>(
  {
    commentId: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    tag: {
      type: Object,
      required: true,
    },

    reply: {
      type: String,
      required: true,
    },

    emotios: {
      type: [],
      required: true,
    },

    userId: {
      type: String,
      ref: "User",
      required: true,
    },

    media: {
      type: [String],
      required: false,
    },

    commentLeft: {
      type: Number,
      default: 0,
    },

    commentRight: {
      type: Number,
      default: 0,
    },

    commentParentId: {
      type: String,
      required: false,
    },

    accomodationId: {
      type: String,
      ref: "Accommodation",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "Comments",
  }
);

commentSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "commentId",
});

export default mongoose.model("Comment", commentSchema);
