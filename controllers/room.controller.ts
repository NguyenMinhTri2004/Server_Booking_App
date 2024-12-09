// import AccommoService from "../services/convenient.service"
import RoomTypeService from "../services/roomType.service";
import RoomService from "../services/room.service";
import { SuccessResponse, CREATED } from "../core/success.response";

class RoomController {
  createRoom = async (req, res, next) => {
    return new CREATED({
      message: "Create Room Ok",
      metadata: await RoomService.create(req.body),
    }).send(res);
  };

  getRoom = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Room Ok",
      metadata: await RoomService.get({ roomId: req.query.roomId }),
    }).send(res);
  };

  getallRoom = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get All Room Ok",
      metadata: await RoomService.getAll(),
    }).send(res);
  };

  updateRoom = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update Room Ok",
      metadata: await RoomService.update(
        { roomId: req.body.roomId },
        { ...req.body }
      ),
    }).send(res);
  };

  deleteRoom = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete Room Ok",
      metadata: await RoomService.delete({ roomId: req.body.roomId }),
    }).send(res);
  };

  createRoomType = async (req, res, next) => {
    return new CREATED({
      message: "Create RoomType Ok",
      metadata: await RoomTypeService.create(req.body),
    }).send(res);
  };

  deleteRoomType = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete RoomType Ok",
      metadata: await RoomTypeService.delete({
        roomTypeId: req.body.roomTypeId,
      }),
    }).send(res);
  };

  getRoomType = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get RoomType Ok",
      metadata: await RoomTypeService.get({
        accommodationSlug: req.query.slug,
      }),
    }).send(res);
  };

  getDetailRoomType = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get all RoomType Ok",
      metadata: await RoomTypeService.getOne({
        accommodationSlug: req.query.accommodationSlug,
        name: req.query.name,
      }),
    }).send(res);
  };

  updateRoomType = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update RoomType Ok",
      metadata: await RoomTypeService.update(
        { roomTypeId: req.body.roomTypeId },
        { ...req.body }
      ),
    }).send(res);
  };
}

export default new RoomController();
