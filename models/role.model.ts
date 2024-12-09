import mongoose, { ObjectIdExpression } from "mongoose";
import nanoid from "../libraries/mongoose-nanoid";

export interface IRole extends mongoose.Document {
  roleId: string;
  name: string;
  slug: string;
  status: string;
  description: string;
  grants: [
    {
      resource: string;
      actions: [];
      attributes: string;
    },
  ];
  created_at: string;
  updated_at: string;
}

const Schema = mongoose.Schema;

const roleSchema = new Schema<IRole>(
  {
    roleId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    status: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    grants: [
      {
        resource: {
          type: String,
          ref: "Resource",
          required: true,
        },

        actions: [
          {
            type: String,
            required: true,
          },
        ],

        attributes: {
          type: String,
          default: "*",
        },
      },
    ],

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
    collection: "Roles",
  }
);

roleSchema.plugin(nanoid, {
  length: 12,
  charset: "0123456789",
  fieldName: "roleId",
});

export default mongoose.model("Role", roleSchema);
