
import pointModel from "../models/point.model";

class PointService {
    static get = async (query) => {
        return await pointModel.findOne(query).lean()
    };
    static getAll = async () => {
        return await pointModel.find().lean()
    };
    static create = async (data) => {
        return await pointModel.create(data)
    };
    static update = async (query, queryUpdate) => {
        return await pointModel.findOneAndUpdate(query, queryUpdate , { returnDocument: 'after', lean: true })
    };

    static delete = async (query) => {
        return await pointModel.findOneAndDelete(query).lean()
    };
};

export default PointService;