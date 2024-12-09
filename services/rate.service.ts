import rateModel from "../models/rate.model";

class RateService {
  static get = async (query) => {
    return await rateModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await rateModel.find().lean();
  };
  static create = async (data) => {
    return await rateModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await rateModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await rateModel.findOneAndDelete(query).lean();
  };
}

export default RateService;
