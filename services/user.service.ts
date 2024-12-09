import userModel from "../models/user.model";
import bcryptjs from "bcryptjs";
import crypto from "node:crypto";
import KeyToKenService from "./keyToken.service";
import { createTokenPair } from "../auth/authUtils";
import { getInfoData, generateOTP } from "../utils";
import {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
  NotFoundError,
} from "../core/error.response";
import { SuccessResponse } from "../core/success.response";
import OTPChangePasswordService from "./otpChangePassword";
import sendMailQueue from "../queue/sendMail/sendMail.queue";
import nodemailer from "nodemailer";
import EmailService from "./mail/service/email.service";
import OtpVerifyEmailService from "./otp/otpVerifyEmail.service";
import { CreateUser } from "../models/repositories/user.repo";
import bcrypt from "bcryptjs";

export enum OAuth2Type {
  FACEBOOK = "facebook",
  GOOGLE = "google",
}

class UserService {
  static findByEmail = async ({
    email,
    select = {
      email: 1,
      password: 1,
      status: 1,
      userRole: 1,
      userId: 1,
    },
  }) => {
    console.log("EmailBe", email)
    return await userModel.findOne({ email }).select(select).lean();
  };

  static create = async (data) => {
    const newUser = new userModel(data);
    const response = await newUser.save();

    if (response) {
      return response;
    }
  };

  static find = async (query = {}, skip = null, limit = null, sort = null) => {
    const Query = userModel.find(query);
    if (skip) Query.skip(skip);
    if (limit) Query.limit(limit);
    if (sort) Query.sort(sort);

    const results = await Query.select("-password").lean().exec();

    return results || [];
  };

  static findById = async (id) => {
    const result = await userModel
      .findById(id)
      .select("-password")
      .lean()
      .exec();
    return result || null;
  };

  static findOne = async (query) => {
    const result = await userModel.findOne(query).select("-password").lean();
    console.log("result:", result);
    return result || null;
  };

  static update = async (query, data) => {
    const result = await userModel
      .findOneAndUpdate(query, data, { returnDocument: "after", lean: true })
      .select("-password");
    return result;
  };

  static delete = async (query) => {
    const result = await userModel.deleteOne(query).lean();
    return result;
  };

  static deleteMany = async (query) => {
    const result = await userModel.deleteMany(query).lean();
    return result;
  };

  static updateByQuery = async (query, queryUpdate) => {
    const userUpdated = await userModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      upsert: false,
    });
    return userUpdated;
  };

  static updateManyByQuery = async (query, queryUpdate) => {
    const userUpdated = await userModel.updateMany(query, queryUpdate).lean();
    return userUpdated;
  };

  static resetPassword = async (email) => {
    console.log("ResetPassword" , email)
    const userExist = await this.findByEmail({ email });

    if (!userExist) {
      throw new BadRequestError("Tk ko ton tai");
    }

    const result = await EmailService.sendEmailResetPasswordToken({
      email,
    });

    return {
      message: "Success",
      metadata: {
        email: result,
      },
    };
  };

  static newUser = async ({ email = null, captcha = null }) => {
    // check email da ton tai trong db chua
    // const foundUser = await this.findByEmail({ email });
    // neu nhu email da ton tai
    // if (foundUser) {
    //   return new NotFoundError("Email exit");
    // }

    //send token via email

    const result = await EmailService.sendEmailLoginToken({
      email,
    });

    return {
      message: "Success",
      metadata: {
        email: result,
      },
    };
  };

  static checkLoginEmailToken = async ({ token }) => {
    try {
      const { email, value } = await OtpVerifyEmailService.checkEMailToken({
        token,
      });

      if (!email) {
        throw new NotFoundError("Not Found Token");
      }

      const hashUser = await this.findUserByEmailWithLogin({
        email,
      });

      if (hashUser) {
        // throw new BadRequestError("Email already exists");
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        const tokens = await createTokenPair(
          { userId: hashUser.userId, email },
          privateKey,
          publicKey
        );

        console.log("Token", tokens);

        await KeyToKenService.createKeyToken({
          userId: hashUser.userId,
          publicKey,
          privateKey,
          refreshToken: tokens.refreshToken,
        });

        return {
          user: getInfoData({
            fields: ["userId", "name", "email", "avatar"],
            object: hashUser,
          }),
          tokens,
        };

        // return {
        //   code: 201,
        //   metadata: {
        //     user: getInfoData({
        //       fields: ["userId", "name", "email"],
        //       object: hashUser,
        //     }),
        //     tokens,
        //   },
        // };
      }

      const passwordHash = await bcrypt.hash(email, 10);

      const newUser = await CreateUser({
        name: "",
        email: email,
        slug: "test-001",
        password: passwordHash,
        role: "user",
        avatar : ""
      });

      if (newUser) {
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        const keyUser = await KeyToKenService.createKeyToken({
          userId: newUser.userId,
          publicKey,
          privateKey,
        });

        if (!keyUser) {
          return {
            code: "xxx",
            message: "Something went wrong",
          };
        }

        const tokens = await createTokenPair(
          { userId: newUser.userId, email },
          publicKey,
          privateKey
        );

        console.log("creating token pair", tokens);

        return {
          code: 201,
          metadata: {
            user: getInfoData({
              fields: ["userId", "name", "email", "avatar"],
              object: newUser,
            }),
            tokens,
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  static checkResetPasswordToken = async ({
    token,
    newPassword1,
    newPassword2,
  }) => {
    try {
      const { email, value } = await OtpVerifyEmailService.checkEMailToken({
        token,
      });

      if (!email) {
        throw new NotFoundError("Not Found Token");
      }

      const userExist = await this.findByEmail({
        email,
      });

      if (!userExist) {
        throw new NotFoundError("Tk khong ton tai");
      }

      if (newPassword1 !== newPassword2) {
        return {
          success: false,
          message: "Password1 and Password2 is not match",
        };
      }

      const passwordHash = await bcrypt.hash(newPassword1, 10);

      const userUpdate = await this.update(
        { userId: userExist.userId },
        { password: passwordHash }
      );

      return {
        message: "Success",
        metadata: {
          user: userUpdate,
        },
      };
    } catch (error) {
      console.log(error);
    }
  };

  static findUserByEmailWithLogin = async ({ email }) => {
    try {
      const user = await userModel.findOne({ email: email }).lean();
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  static CreateOAuth2InformationGoogle = async (
    auth2User,
    type: OAuth2Type
  ) => {
    //Find and insert if not found, update if exist.
    const data = await userModel.findOne({ authGoogleId: auth2User.id });
    if (data) {
      return data;
    } else {
      const email = auth2User?.emails?.[0]?.value;
      const emailExist = await userModel.findOne({ email });
      if (emailExist) {
        return emailExist;
      } else {
        const newData = await this.create({
          email: auth2User?.emails?.[0]?.value,
          name: auth2User?.displayName,
          authType: type,
          authGoogleId: auth2User.id,
          avatar: auth2User?.photos?.[0]?.value,
        });
        return newData;
      }
    }
  };

  static CreateOAuth2InformationFacebook = async (
    auth2User,
    type: OAuth2Type
  ) => {
    //Find and insert if not found, update if exist.
    const data = await userModel.findOne({ authFacebookId: auth2User.id });
    if (data) {
      return data;
    } else {
      const newData = await this.create({
        name: auth2User.displayName,
        authType: type,
        authFacebookId: auth2User.id,
        avatar: auth2User?.photos?.[0]?.value,
      });
      return newData;
    }
  };
}

export default UserService;
