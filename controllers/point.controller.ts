import PointService from "../services/point.service";
import { SuccessResponse, CREATED } from "../core/success.response";

class PointController {
  createPoint = async (req, res, next) => {
    return new CREATED({
      message: "Create Point Ok",
      metadata: await PointService.create(req.body),
    }).send(res);
  };

  getallPointByUserId = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Point Ok",
      metadata: await PointService.get({ userId: req.query.userId }),
    }).send(res);
  };

  getPointById = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Point Ok",
      metadata: await PointService.get({ pointId: req.query.pointId }),
    }).send(res);
  };

  getallPoint = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get All Point Ok",
      metadata: await PointService.getAll(),
    }).send(res);
  };

  updatePoint = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update Point Ok",
      metadata: await PointService.update(
        { pointId: req.body.pointId },
        { ...req.body }
      ),
    }).send(res);
  };

  deletePoint = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete Voucher Ok",
      metadata: await PointService.delete({ pointId: req.body.pointId }),
    }).send(res);
  };
}

export default new PointController();
