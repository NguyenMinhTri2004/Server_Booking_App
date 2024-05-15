import roomModel from "../models/room.model";


class RoomService {
    static get = async (query) => {
        return await roomModel.findOne(query).lean()
    };
    static getAll = async () => {
        return await roomModel.find().lean()
    };
    static create = async (data) => {
        return await roomModel.create(data)
    };
    static update = async (query, queryUpdate) => {
        return await roomModel.findOneAndUpdate(query, queryUpdate , { returnDocument: 'after', lean: true })
    };

    static delete = async (query) => {
        return await roomModel.findOneAndDelete(query).lean()
    };
};

export default RoomService;