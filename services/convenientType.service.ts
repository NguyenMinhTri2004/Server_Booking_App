import convenientTypeModel from "../models/convenientType.model";

class ConvenientTypeService {
  static get = async (query) => {
    return await convenientTypeModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await convenientTypeModel.find().lean();
  };
  static create = async (data) => {
    return await convenientTypeModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await convenientTypeModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await convenientTypeModel.findOneAndDelete(query).lean();
  };
}

export default ConvenientTypeService;
