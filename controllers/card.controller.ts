import CardService from "../services/card.service";
import { SuccessResponse, CREATED } from "../core/success.response";
import { validationResult } from "express-validator";
import { Request, Response } from "express";

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_KEY: "x-client-id",
  AUTHORIZATION: "authorization",
};

class CardController {
  create = async (req, res, next) => {
    try {
      const userId = req.headers[HEADER.CLIENT_KEY];
      console.log("Create requet ", req.body);
      return new CREATED({
        message: "Create Card Ok",
        metadata: await CardService.create({userId, ...req.body}),
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
        message: "get Card Success",
        metadata: await CardService.find({userId}),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  updateCard = async (req, res, next) => {
    try {
    //   const userId = req.headers[HEADER.CLIENT_KEY];
      return new SuccessResponse({
        message: "update Card Success",
        metadata: await CardService.update({ cardId: req?.body?.cardId }, { ...req.body }),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  deleteCard = async (req, res, next) => {
    try {
    //   const userId = req.headers[HEADER.CLIENT_KEY];
      return new SuccessResponse({
        message: "Delete Card Success",
        metadata: await CardService.delete({ cardId: req?.body?.cardId }),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };
}

export default new CardController();
