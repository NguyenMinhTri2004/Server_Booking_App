
import orderModel from "../models/order.model";


class OrderService {
    static get = async (query) => {
        return await orderModel.findOne(query).lean()
    };
    static getAll = async () => {
        return await orderModel.find().lean()
    };
    static create = async (data) => {
        return await orderModel.create(data)
    };
    static update = async (query, queryUpdate) => {
        return await orderModel.findOneAndUpdate(query, queryUpdate , { returnDocument: 'after', lean: true })
    };

    static delete = async (query) => {
        return await orderModel.findOneAndDelete(query).lean()
    };
};

export default OrderService;