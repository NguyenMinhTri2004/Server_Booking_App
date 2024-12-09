import NotifyService from "../services/notify.service";
import { SuccessResponse, CREATED } from "../core/success.response";

class NotifyController {
  createNotify = async (req, res, next) => {
    return new CREATED({
      message: "Create Notify Ok",
      metadata: await NotifyService.create(req.body),
    }).send(res);
  };

  getallNotifyrByUserId = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Notify Ok",
      metadata: await NotifyService.get({ recipients: req.query.recipient }),
    }).send(res);
  };

  getNotifyById = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Notify Ok",
      metadata: await NotifyService.get({ notifyId: req.query.notifyId }),
    }).send(res);
  };

  getallNotify = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get All Notify Ok",
      metadata: await NotifyService.getAll(),
    }).send(res);
  };

  updateNotify = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update Notify Ok",
      metadata: await NotifyService.update(
        { notifyId: req.query.notifyId },
        { ...req.body }
      ),
    }).send(res);
  };

  deleteNotify = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete Notify Ok",
      metadata: await NotifyService.delete({ notifyId: req.query.notifyId }),
    }).send(res);
  };
}

export default new NotifyController();
