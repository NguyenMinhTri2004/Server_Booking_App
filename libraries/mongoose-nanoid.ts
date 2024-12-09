import type { Schema } from "mongoose";
import { urlAlphabet } from "nanoid";
import { customAlphabet } from "nanoid/async";

export type { Options };

type Options = {
  fieldName?: string;
  length?: number;
  charset?: string;
  attemps?: number;
  attempsErrorMessage?: string;
};

export default function plugin(schema: Schema, opts: Options = {}) {
  const fieldName = opts.fieldName || "_id";
  const attemps = opts.attemps || 3;
  const attempsErrorMessage =
    opts.attempsErrorMessage || "Failed to generate the ID.";
  const generateId = customAlphabet(
    opts.charset || urlAlphabet,
    opts.length || 21
  );

  schema.add({
    [fieldName]: {
      type: String,
      default: "",
    },
  });

  schema.pre("save", async function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this.isNew && !this.constructor.$isArraySubdocument) {
      let newId: string;
      let remains = attemps;

      do {
        if (remains === 0) {
          throw new Error(attempsErrorMessage);
        }

        remains -= 1;

        newId = await generateId();
      } while (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.constructor.exists({
          [fieldName]: newId,
        })
      );

      this[fieldName] = newId;
    }
  });

  schema.pre("insertMany", async function (next, docs) {
    if (Array.isArray(docs) && docs.length) {
      for (let i = 0; i < docs.length; i++) {
        let newId: string;
        let remains = attemps;

        do {
          if (remains === 0) {
            throw new Error(attempsErrorMessage);
          }

          remains -= 1;

          newId = await generateId();
        } while (
          await this.exists({
            [fieldName]: newId,
          })
        );
        docs[i][fieldName] = newId;
      }
      next();
    } else {
      return next(new Error("List should not be empty"));
    }
  });
}
