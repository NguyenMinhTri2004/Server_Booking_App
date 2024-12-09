import { setDefaultHighWaterMark } from "node:stream";
import resourceModel from "../models/resource.model";

class ResourceService {
  static get = async (query) => {
    return await resourceModel.findOne(query).lean();
  };
  static getAll = async ({
    userId = 0,
    limit = 30,
    offset = 0,
    search = "",
  }) => {
    try {
      const resources = await resourceModel.aggregate([
        {
          $project: {
            name: "name",
            slug: "slug",
            description: "description",
            resourceId: "resourceId",
          },
        },
      ]);

      return resources;
    } catch (error) {
      console.log(error);
    }
  };
  static create = async ({
    name = "order",
    slug = "p00001",
    description = "",
  }) => {
    try {
      const resource = await resourceModel.create({
        name: name,
        slug: slug,
        description: description,
      });

      return resource;
    } catch (error) {
      console.error(error);
    }
  };
  static update = async (query, queryUpdate) => {
    return await resourceModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await resourceModel.findOneAndDelete(query).lean();
  };
}

export default ResourceService;
