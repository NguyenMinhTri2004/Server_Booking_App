import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    status: {
      type: Number, // 0: Deactive | 1: Active
      required: true,
    },
    created_by: {
      type: String,
      required: false,
    },
    updated_by: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "File",
  }
);

export default mongoose.model("File", fileSchema);
