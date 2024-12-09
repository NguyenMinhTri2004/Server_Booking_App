import UserService from "../services/user.service";
import { SuccessResponse, CREATED } from "../core/success.response";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_KEY: "x-client-id",
  AUTHORIZATION: "authorization",
};

class UserController {
  create = async (req, res, next) => {
    try {
      console.log("Create requet ", req.body);
      return new CREATED({
        message: "Create U Ok",
        metadata: await UserService.create(req.body),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  getByUserId = async (req, res, next) => {
    try {
      const userId = req.headers[HEADER.CLIENT_KEY];
      // console.log("Create requet ", req?.query?.userId);
      return new SuccessResponse({
        message: "get User Success",
        metadata: await UserService.findOne({userId}),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const userId = req.headers[HEADER.CLIENT_KEY];
      return new SuccessResponse({
        message: "update User Success",
        metadata: await UserService.update({ userId: userId }, { ...req.body }),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const userId = req.headers[HEADER.CLIENT_KEY];
      return new SuccessResponse({
        message: "Delete User Success",
        metadata: await UserService.delete({ userId: userId }),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  resetPassword = async (req: Request, res: Response, next) => {
    try {
      console.log("ResetPasswordController", req?.body?.email)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array(),
          data: null,
        });
      }

      return new SuccessResponse({
        message: "Forgot Password Success",
        metadata: await UserService.resetPassword(req.body.email),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  newUserByEmail = async (req: Request, res: Response, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array(),
          data: null,
        });
      }

      console.log("Erros", errors);

      return new SuccessResponse({
        message: "new user by email",
        metadata: await UserService.newUser({ email: req.body.email }),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  checkLoginEmailToken = async (req, res, next) => {
    try {
      const token = req?.query?.token;
      return new SuccessResponse({
        message: "check user by email",
        metadata: await UserService.checkLoginEmailToken({ token: token }),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  checkResetPasswordEmailToken = async (req, res, next) => {
    try {
      const token = req?.query?.token;
      const newPassword1 = "testPassword";
      const newPassword2 = "testPassword";

      return new SuccessResponse({
        message: "check reset password by email",
        metadata: await UserService.checkResetPasswordToken({
          token,
          newPassword1,
          newPassword2,
        }),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };
}

export default new UserController();
