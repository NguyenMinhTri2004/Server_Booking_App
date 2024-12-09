import { BadRequestError } from "../core/error.response";
import roomAvailableModel from "../models/roomAvailable.model";

const { hotel } = require("../models/accommodation.model");

class RoomAvailableService {
  static get = async (query) => {
    return await roomAvailableModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await roomAvailableModel.find().lean();
  };
  static create = async (data) => {
    return await roomAvailableModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await roomAvailableModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };
  static delete = async (query) => {
    return await roomAvailableModel.findOneAndDelete(query).lean();
  };
  static addStockToRoomAvailable = async (data) => {
    const {
      stock,
      accommodationId,
      userId,
      location = "TPHCM, Can Gio, TTH",
    } = data;
    const hotelEdit = hotel.findOne({ accommodationId: accommodationId });
    if (!hotelEdit) {
      throw new BadRequestError("The hotel not exits");
    }

    const query = {
      accommodationId: accommodationId,
      userId: userId,
    };

    const updateSet = {
      $inc: {
        value: stock,
      },
      $set: {
        location: location,
      },
    };

    const options = {
      upsert: true,
      new: true,
    };

    return await roomAvailableModel
      .findOneAndUpdate(query, updateSet, options)
      .lean();
  };
  static reservation = async (data) => {
    const { quantity, accommodationId } = data;
    const query = {
      accommodationId: accommodationId,
      value: {
        $gte: quantity,
      },
    };

    const updateSet = {
      $inc: {
        value: -quantity,
      },

      $push: {
        roomAvailableReservation: {
          quantity,
          createOn: new Date(),
        },
      },
    };

    const option = {
      new: true,
      upsert: true,
    };

    return await roomAvailableModel.updateOne(query, updateSet, option).lean();
  };
}

export default RoomAvailableService;
