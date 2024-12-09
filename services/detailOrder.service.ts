import detailOrderModel from "../models/detailOrder.model";

class DetailOrderService {
  static get = async (query) => {
    return await detailOrderModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await detailOrderModel.find().lean();
  };
  static create = async (data) => {
    return await detailOrderModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await detailOrderModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await detailOrderModel.findOneAndDelete(query).lean();
  };
}

export default DetailOrderService;
