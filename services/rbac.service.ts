import resourceModel from "../models/resource.model";

class RbacService {
  static get = async (query) => {
    return await resourceModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await resourceModel.find().lean();
  };
  static create = async (data) => {
    return await resourceModel.create(data);
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

export default RbacService;
