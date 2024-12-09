import otpVerificationEmailModel from "../../models/otpVerificationEmail.model";
import { generateOTP } from "../../utils";

class OtpVerifyEmailService {
  static get = async (query) => {
    return await otpVerificationEmailModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await otpVerificationEmailModel.find().lean();
  };
  static create = async (data) => {
    return await otpVerificationEmailModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await otpVerificationEmailModel.findOneAndUpdate(
      query,
      queryUpdate,
      { returnDocument: "after", lean: true }
    );
  };
  static delete = async (query) => {
    return await otpVerificationEmailModel.findOneAndDelete(query).lean();
  };
  static newOtp = async ({ email }) => {
    const OTP = await generateOTP();
    const newOtp = await otpVerificationEmailModel.create({
      value: OTP.otp,
      email: email,
    });

    console.log("New OTP" , newOtp);
    return newOtp;
  };
  static checkEMailToken = async ({ token }) => {
    const tokenFound = await otpVerificationEmailModel.findOne({
      value: token,
    });

    if (!tokenFound) {
      throw new Error("Token not found");
    }

    otpVerificationEmailModel.deleteOne({
      value: token,
    });

    return tokenFound;
  };
}

export default OtpVerifyEmailService;
