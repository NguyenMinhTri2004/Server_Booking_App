import mongoose, { Mixed, model } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface ItemplateEmail extends mongoose.Document {
  templateId: string;
  name: string;
  status: boolean;
  html: string;
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const templateEmailSchema = new Schema<ItemplateEmail>(
  {
    templateId: {
      type: "string",
      required: false,
    },
    name: {
      type: "string",
      required: true,
    },
    status: {
      type: "boolean",
      required: false,
    },
    html: {
      type: "string",
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
    collection: "TemplateEmails",
  }
);

templateEmailSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "templateId",
});

//Export the model

export default mongoose.model("TemplateEmail", templateEmailSchema);
