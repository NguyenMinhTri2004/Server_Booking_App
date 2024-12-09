import convenientNearModel from "../models/convenientNear.model";

class ConvenientNearService {
  static get = async (query) => {
    return await convenientNearModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await convenientNearModel.find().lean();
  };
  static create = async (data) => {
    return await convenientNearModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await convenientNearModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await convenientNearModel.findOneAndDelete(query).lean();
  };
}

export default ConvenientNearService;
