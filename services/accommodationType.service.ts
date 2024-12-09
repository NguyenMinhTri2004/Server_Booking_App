import accommodationTypeModel from "../models/accommodationType.model";
import { Types } from "mongoose";

class AccommodationTypeService {
  static get = async (query) => {
    return await accommodationTypeModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await accommodationTypeModel.find().lean();
  };
  static create = async (data) => {
    return await accommodationTypeModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await accommodationTypeModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await accommodationTypeModel.findOneAndDelete(query).lean();
  };
}

export default AccommodationTypeService;
