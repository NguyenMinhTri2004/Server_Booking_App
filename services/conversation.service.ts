import conversationModel from "../models/conversation.model";

class ConvenrsationService {
  static get = async (query) => {
    return await conversationModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await conversationModel.find().lean();
  };
  static create = async (data) => {
    return await conversationModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await conversationModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await conversationModel.findOneAndDelete(query).lean();
  };
}

export default ConvenrsationService;
