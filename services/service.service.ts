import serviceModel from "../models/service.model";


class ServiceService {
    static get = async (query) => {
        return await serviceModel.findOne(query).lean()
    };
    static getAll = async () => {
        return await serviceModel.find().lean()
    };
    static create = async (data) => {
        return await serviceModel.create(data)
    };
    static update = async (query, queryUpdate) => {
        return await serviceModel.findOneAndUpdate(query, queryUpdate , { returnDocument: 'after', lean: true })
    };

    static delete = async (query) => {
        return await serviceModel.findOneAndDelete(query).lean()
    };
};

export default ServiceService;