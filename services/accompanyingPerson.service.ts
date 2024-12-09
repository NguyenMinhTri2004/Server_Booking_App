import accompanyingPersonModel from "../models/accompanyingPerson.model";

class AccompanyingPersonService {
  static create = async (data) => {
    const newUser = new accompanyingPersonModel(data);
    const response = await newUser.save();

    if (response) {
      return response;
    }
  };

  static find = async (query = {}, skip = null, limit = null, sort = null) => {
    const Query = accompanyingPersonModel.find(query);
    if (skip) Query.skip(skip);
    if (limit) Query.limit(limit);
    if (sort) Query.sort(sort);

    const results = await Query.select("-password").lean().exec();

    return results || [];
  };

  static findById = async (id) => {
    const result = await accompanyingPersonModel
      .findById(id)
      .lean()
      .exec();
    return result || null;
  };

  static findOne = async (query) => {
    const result = await accompanyingPersonModel.findOne(query).lean();
    console.log("result:", result);
    return result || null;
  };

  static update = async (query, data) => {
    const result = await accompanyingPersonModel
      .findOneAndUpdate(query, data, { returnDocument: "after", lean: true })
    return result;
  };

  static delete = async (query) => {
    const result = await accompanyingPersonModel.deleteOne(query).lean();
    return result;
  };

  static deleteMany = async (query) => {
    const result = await accompanyingPersonModel.deleteMany(query).lean();
    return result;
  };

  static updateByQuery = async (query, queryUpdate) => {
    const userUpdated = await accompanyingPersonModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      upsert: false,
    });
    return userUpdated;
  };

  static updateManyByQuery = async (query, queryUpdate) => {
    const userUpdated = await accompanyingPersonModel.updateMany(query, queryUpdate).lean();
    return userUpdated;
  };
}

export default AccompanyingPersonService;
