import userModel from "../models/user.model";
import bcryptjs from "bcryptjs";
import crypto from "node:crypto";
import KeyToKenService from "./keyToken.service";
import { createTokenPair } from "../auth/authUtils";
import { getInfoData, generateOTP} from "../utils";
import { BadRequestError , AuthFailureError , ForbiddenError} from "../core/error.response";
import OTPChangePasswordService from "./otpChangePassword";
import sendMailQueue from "../queue/sendMail/sendMail.queue";
import nodemailer from "nodemailer";

class UserService {
    static findByEmail = async ({email , select = {
        email : 1,
        password : 1,
        status : 1,
        userRole : 1,
        userId : 1

    }}) => {
        return await userModel.findOne({ email }).select(select).lean()
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
    
        const results = await Query.select('-password').lean().exec();
    
        return results || [];
    };

    static findById = async (id) => {
        const result = await userModel.findById(id).select('-password').lean().exec();
        return result || null;
    };

    static findOne = async (query) => {
        const result = await userModel.findOne(query).select('-password').lean()
        console.log('result:', result);
        return result || null;
    };

    static update = async (query, data) => {
        const result = await userModel.findOneAndUpdate(query, data, { returnDocument: 'after', lean: true }).select('-password');
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
          returnDocument: 'after',
          upsert: false,
        });
        return userUpdated;
    };

    static updateManyByQuery = async (query, queryUpdate) => {
        const userUpdated = await userModel.updateMany(query, queryUpdate).lean();
        return userUpdated;
    };

    static forgotPassword = async (email) => {
        // const userUpdated = await userModel.updateMany(query, queryUpdate).lean();
        // return userUpdated;
        const userExist = await UserService.findByEmail({ email: email.trim()});

        if (!userExist) {
            throw new BadRequestError('Tk ko ton tai')
        }

        const otpService = new OTPChangePasswordService();
        const { otp, timestamp } = generateOTP();

        const otpUpsert = await otpService.Upsert(
            { userId: userExist.userId },
            { userId: userExist.userId, value: otp, expired_at: timestamp + 300000, used: false }
        );

        if (otpUpsert) {
            // const subject = 'Verify your request recover password with OTP';
            // const contentMail = `<p>Your OTP to verify your request recover password is ${otp}</p>`;
            // await sendMailQueue
            //   .create('bookingSendEmailQueue', { receiver: email, content: contentMail, subject })
            //   .priority('critical')
            //   .attempts(3)
            //   .save();

            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                  user: "maddison53@ethereal.email",
                  pass: "jn7jnAPss4f63QBp6D",
                },
            });

            const info = await transporter.sendMail({
                from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
                to: "nguyenminhtri.vnpt2@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
              });
            
              console.log("Message sent: %s", info.messageId);
      
            return { success: true, message: 'New OTP sent successfully' };
        }

        return {
            success: false,
            message: 'Server upsert OTP fail',
        };
    };
    
}

export default UserService;