import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import KeyToKenService from "./keyToken.service";
import { createTokenPair, verifyJWT } from "../auth/authUtils";
import { getInfoData } from "../utils";
import UserService from "./user.service";
import EmailService from "./mail/service/email.service";
import {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} from "../core/error.response";
import { token } from "morgan";

class AccessService {
  static signUp = async ({
    email,
    name,
    avatar,
    phoneNumber,
    authType,
    authGoogleId,
    authFacebookId,
    refreshToken = null,
  }) => {
    try {
      console.log("email", email);

      console.log("name", name);

      const authGoogleExit = await userModel.findOne({ authGoogleId }).lean();
      const authFacebookExit = await userModel
        .findOne({ authFacebookId })
        .lean();

      if (authGoogleExit || authFacebookExit) {
        const response = await this.signIn({
          email,
          name,
          avatar,
          phoneNumber,
          authType,
          authGoogleId,
          authFacebookId,
        });

        return response;
      }

      // const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        email,
        name,
        // password: passwordHash,
        avatar,
        phoneNumber,
        authType,
        authGoogleId,
        authFacebookId,
      });

      if (newUser) {
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        const keyUser = await KeyToKenService.createKeyToken({
          userId: newUser.userId,
          publicKey,
          privateKey,
          refreshToken,
        });

        console.log("Public Key String: " + keyUser);

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
          user: getInfoData({
            fields: ["userId", "name", "email", "avatar"],
            object: newUser,
          }),
          tokens,
        };
      }
    } catch (e) {
      console.log(e);
    }
  };

  static signIn = async ({
    email,
    name,
    avatar,
    phoneNumber,
    authType,
    authGoogleId,
    authFacebookId,
    refreshToken = null,
  }) => {
    let foundUser = null;
    const authGoogleExit = await userModel.findOne({ authGoogleId }).lean();
    const authFacebookExit = await userModel.findOne({ authFacebookId }).lean();

    if (authGoogleExit) {
      foundUser = authGoogleExit;
    } else {
      foundUser = authFacebookExit;
    }

    if (!foundUser) {
      throw new BadRequestError("Tk ko ton tai");
    }

    console.log("foundUser ", foundUser);

    // console.log("PasswordDb ", foundUser.password);

    // const math = bcrypt.compare(password, foundUser.password);

    // if (!math) {
    //   throw new AuthFailureError("Tk hoac mk ko dung");
    // }

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { userId: foundUser.userId, email },
      privateKey,
      publicKey
    );

    console.log("Token", tokens);

    await KeyToKenService.createKeyToken({
      userId: foundUser.userId,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    // return {
    //   user: getInfoData({
    //     fields: ["userId", "name", "email"],
    //     object: foundUser,
    //   }),
    //   tokens,
    // };

    return {
      code: 201,
      user: getInfoData({
        fields: ["userId", "name", "email", "avatar"],
        object: foundUser,
      }),
      tokens,
    };
  };

  static logOut = async (keyStore) => {
    const delKey = await KeyToKenService.removeKeyById(keyStore._id);
    return delKey;
  };

  static handleRefreshToken = async (refreshToken) => {
    // check xem token nay da duoc dung chua
    const foundToken =
      await KeyToKenService.findByRefreshTokenUsed(refreshToken);
    if (foundToken) {
      console.log("found token" + foundToken);
      //check xem la ai
      const { userId, email } = (await verifyJWT(
        refreshToken,
        foundToken.publicKey
      )) as { userId: string; email: string };
      console.log({ userId, email });
      // xoa tat ca token trong keytore
      await KeyToKenService.deleteKeyById(userId);
      throw new ForbiddenError("Pl rea login");
    }

    const holderToken = await KeyToKenService.findByRefreshToken(refreshToken);

    if (!holderToken) {
      throw new AuthFailureError("User not dk 1");
    }

    // veriy Token

    console.log("holderToken", holderToken);

    console.log("refreshToken", refreshToken);

    console.log("holderToken.privateKey", holderToken.privateKey);

    const { userId, email } = (await verifyJWT(
      refreshToken,
      holderToken.publicKey
    )) as { userId: string; email: string };

    console.log({ userId, email });

    // check userid

    const foundUser = await UserService.findByEmail({ email });

    console.log();

    if (!foundUser) {
      throw new AuthFailureError("User not dk 2");
    }

    //tao 1 cap token moi

    const tokens = await createTokenPair(
      { userId, email },
      holderToken.publicKey,
      holderToken.privateKey
    );

    //updateToken

    await holderToken.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },

      $addToSet: {
        refreshTokensUsed: refreshToken, // da duoc dung de lay 1 cap token moi
      },
    });

    return {
      user: { userId, email },
      tokens,
    };
  };
}

export default AccessService;
