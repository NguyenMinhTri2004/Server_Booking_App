import AccompanyingPersonService from "../services/accompanyingPerson.service";
import { SuccessResponse, CREATED } from "../core/success.response";
import { validationResult } from "express-validator";
import { Request, Response } from "express";

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_KEY: "x-client-id",
  AUTHORIZATION: "authorization",
};

class AccompanyingPersonController {
  create = async (req, res, next) => {
    try {
      const userId = req.headers[HEADER.CLIENT_KEY];
      console.log("Create requet ", req.body);
      return new CREATED({
        message: "Create AccompanyingPerson Ok",
        metadata: await AccompanyingPersonService.create({userId, ...req.body}),
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
        message: "get AccompanyingPerson Success",
        metadata: await AccompanyingPersonService.find({userId}),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  updateAccompanyingPerson = async (req, res, next) => {
    try {
    //   const userId = req.headers[HEADER.CLIENT_KEY];
      return new SuccessResponse({
        message: "update AccompanyingPerson Success",
        metadata: await AccompanyingPersonService.update({ accompanyingPersonId: req?.body?.accompanyingPersonId }, { ...req.body }),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  deleteAccompanyingPerson = async (req, res, next) => {
    try {
    //   const userId = req.headers[HEADER.CLIENT_KEY];
      return new SuccessResponse({
        message: "Delete AccompanyingPerson Success",
        metadata: await AccompanyingPersonService.delete({ accompanyingPersonId: req?.body?.accompanyingPersonId }),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };
}

export default new AccompanyingPersonController();
