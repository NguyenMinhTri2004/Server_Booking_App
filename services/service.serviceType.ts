import serviceTypeModel from "../models/serviceType.model";

class ServiceTypeService {
  static get = async (query) => {
    return await serviceTypeModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await serviceTypeModel.find().lean();
  };
  static create = async (data) => {
    return await serviceTypeModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await serviceTypeModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await serviceTypeModel.findOneAndDelete(query).lean();
  };
}

export default ServiceTypeService;
