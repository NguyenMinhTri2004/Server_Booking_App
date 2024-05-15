import commentModel from "../models/comment.model";


class CommentService {
    static get = async (query) => {
        return await commentModel.findOne(query).lean()
    };
    static getAll = async () => {
        return await commentModel.find().lean()
    };
    static create = async (data) => {
        return await commentModel.create(data)
    };
    static update = async (query, queryUpdate) => {
        return await commentModel.findOneAndUpdate(query, queryUpdate , { returnDocument: 'after', lean: true })
    };

    static delete = async (query) => {
        return await commentModel.findOneAndDelete(query).lean()
    };
};

export default CommentService;