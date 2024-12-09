import convenientNearTypeModel from "../models/convenientNearType.model";

class ConvenientNearTypeService {
  static get = async (query) => {
    return await convenientNearTypeModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await convenientNearTypeModel.find().lean();
  };
  static create = async (data) => {
    return await convenientNearTypeModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await convenientNearTypeModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await convenientNearTypeModel.findOneAndDelete(query).lean();
  };
}

export default ConvenientNearTypeService;
