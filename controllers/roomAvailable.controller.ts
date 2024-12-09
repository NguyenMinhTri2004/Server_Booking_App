import { SuccessResponse, CREATED } from "../core/success.response";
import RoomAvailableService from "../services/roomAvailable.service";

class RoomAvailableController {
  createRoomAvailable = async (req, res, next) => {
    return new CREATED({
      message: "Create RoomAvailable Ok",
      metadata: await RoomAvailableService.create(req.body),
    }).send(res);
  };

  getallRoomAvailableByUserId = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get RoomAvailable Ok",
      metadata: await RoomAvailableService.get({ userId: req.query.userId }),
    }).send(res);
  };

  getRoomAvailabletById = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get RoomAvailable Ok",
      metadata: await RoomAvailableService.get({
        roomAvailableId: req.query.roomAvailableId,
      }),
    }).send(res);
  };

  getallRoomAvailable = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get All RoomAvailable Ok",
      metadata: await RoomAvailableService.getAll(),
    }).send(res);
  };

  updateRoomAvailable = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update RoomAvailable Ok",
      metadata: await RoomAvailableService.update(
        { roomAvailableId: req.body.roomAvailableId },
        { ...req.body }
      ),
    }).send(res);
  };

  deleteRoomAvailable = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete RoomAvailable Ok",
      metadata: await RoomAvailableService.delete({
        roomAvailableId: req.body.roomAvailableId,
      }),
    }).send(res);
  };
}

export default new RoomAvailableController();
