import roleModel from "../models/role.model";

class RoleService {
  static get = async (query) => {
    return await roleModel.findOne(query).lean();
  };
  static getAll = async ({
    userId = 0,
    limit = 30,
    offset = 0,
    search = "",
  }) => {
    try {
      // userId
      // List role

      const roles = roleModel.aggregate([
        {
          $unwind: "$grants",
        },
        {
          $lookup: {
            from: "Resources",
            localField: "grants.resource",
            foreignField: "resourceId",
            as: "resource",
          },
        },
        {
          $unwind: "$resource",
        },
        {
          $project: {
            role: "$name",
            resource: "$resource.name",
            action: "$grants.actions",
            attributes: "$grants.attributes",
          },
        },
        {
          $unwind: "$action",
        },
        {
          $project: {
            resourceId: 0,
            role: 1,
            resource: 1,
            action: "$action",
            attributes: "1",
          },
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };
  static create = async (data) => {
    return await roleModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await roleModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await roleModel.findOneAndDelete(query).lean();
  };
}

export default RoleService;
