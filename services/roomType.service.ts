
import roomTypeModel from "../models/roomType.model";

class RoomTypeService {
    static get = async (query) => {
        return await roomTypeModel.findOne(query).lean()
    };
    static getAll = async () => {
        return await roomTypeModel.find().lean()
    };
    static create = async (data) => {
        return await roomTypeModel.create(data)
    };
    static update = async (query, queryUpdate) => {
        return await roomTypeModel.findOneAndUpdate(query, queryUpdate , { returnDocument: 'after', lean: true })
    };

    static delete = async (query) => {
        return await roomTypeModel.findOneAndDelete(query).lean()
    };

}

export default RoomTypeService;