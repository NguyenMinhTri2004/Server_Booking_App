import notifyModel from "../models/notify.model";

class NotifyService {
  static get = async (query) => {
    return await notifyModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await notifyModel.find().lean();
  };
  static create = async (data) => {
    return await notifyModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await notifyModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await notifyModel.findOneAndDelete(query).lean();
  };
}

export default NotifyService;
