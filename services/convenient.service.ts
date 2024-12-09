import convenientModel from "../models/convenient.model";

class ConvenientService {
  static get = async (query) => {
    return await convenientModel.find(query).lean();
  };
  static getAll = async () => {
    return await convenientModel.find().lean();
  };
  static create = async (data) => {
    return await convenientModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await convenientModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await convenientModel.findOneAndDelete(query).lean();
  };
}

export default ConvenientService;
