
import voucherModel from "../models/voucher.model";

class VoucherService {
    static get = async (query) => {
        return await voucherModel.findOne(query).lean()
    };
    static getAll = async () => {
        return await voucherModel.find().lean()
    };
    static create = async (data) => {
        return await voucherModel.create(data)
    };
    static update = async (query, queryUpdate) => {
        return await voucherModel.findOneAndUpdate(query, queryUpdate , { returnDocument: 'after', lean: true })
    };

    static delete = async (query) => {
        return await voucherModel.findOneAndDelete(query).lean()
    };
};

export default VoucherService;