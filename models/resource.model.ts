import mongoose, { ObjectIdExpression } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IResource extends mongoose.Document {
  resourceId: string;
  slug: string;
  description: string;
  name: string;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

const resourceSchema = new Schema<IResource>(
  {
    resourceId: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    created_at: {
      type: String,
      required: true,
    },

    updated_at: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "Resources",
  }
);

resourceSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "resourceId",
});

export default mongoose.model("Resource", resourceSchema);
