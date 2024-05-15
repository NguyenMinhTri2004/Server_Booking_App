import otpChangePassword from '../models/otpChangePassword.model';

export default class OTPChangePasswordService {
  Create = async (data) => {
    const newOtp = new otpChangePassword(data);
    const response = await newOtp.save();

    if (response) {
      return response;
    }
  };

  Find = async (query = {}, skip?: number, limit?: number, sort?: any) => {
    const Query = otpChangePassword.find(query);
    if (skip) Query.skip(skip);
    if (limit) Query.limit(limit);
    if (sort) Query.sort(sort);

    const results = await Query.exec();

    return results || [];
  };

  Count = async (query) => {
    const count = await otpChangePassword.countDocuments(query).exec();

    return count;
  };

  FindOne = async (query) => {
    const response = await otpChangePassword.findOne(query).exec();

    return response || null;
  };

  FindById = async (id) => {
    const response = await otpChangePassword.findOne({ _id: id }).exec();

    return response || null;
  };

  Update = async (query, dataUpdate) => {
    const otpUpdated = await otpChangePassword.findOneAndUpdate(
      query,
      {
        $set: { ...dataUpdate },
      },
      {
        returnDocument: 'after',
      }
    );

    return otpUpdated;
  };

  Upsert = async (query, dataUpdate) => {
    const otpUpdated = await otpChangePassword
      .findOneAndUpdate(
        query,
        {
          $set: { ...dataUpdate },
        },
        {
          returnDocument: 'after',
          upsert: true,
        }
      )
      .select('-password');

    return otpUpdated;
  };
}
