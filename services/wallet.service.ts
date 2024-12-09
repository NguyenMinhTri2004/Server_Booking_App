import walletModel from "../models/wallet.model";

class WalletService {
  static get = async (query) => {
    return await walletModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await walletModel.find().lean();
  };
  static create = async (data) => {
    return await walletModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await walletModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await walletModel.findOneAndDelete(query).lean();
  };
}

export default WalletService;
