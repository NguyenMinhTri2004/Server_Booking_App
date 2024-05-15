import messageModel from "../models/message.model";

class MessageService {
    static get = async (query) => {
        return await messageModel.findOne(query).lean()
    };
    static getAll = async () => {
        return await messageModel.find().lean()
    };
    static create = async (data) => {
        return await messageModel.create(data)
    };
    static update = async (query, queryUpdate) => {
        return await messageModel.findOneAndUpdate(query, queryUpdate , { returnDocument: 'after', lean: true })
    };

    static delete = async (query) => {
        return await messageModel.findOneAndDelete(query).lean()
    };
};

export default MessageService;