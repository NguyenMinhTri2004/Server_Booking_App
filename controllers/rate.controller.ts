import RateService from "../services/rate.service";
import { SuccessResponse, CREATED } from "../core/success.response";

class VoucherController {
  createRate = async (req, res, next) => {
    return new CREATED({
      message: "Create Rate Ok",
      metadata: await RateService.create(req.body),
    }).send(res);
  };

  getallRateByUserId = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Rate Ok",
      metadata: await RateService.get({ userId: req.query.userId }),
    }).send(res);
  };

  getRateById = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Rate Ok",
      metadata: await RateService.get({ rateId: req.query.rateId }),
    }).send(res);
  };

  getRateByAccommodation = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Rate Ok",
      metadata: await RateService.get({
        accomodationId: req.query.accomodationId,
      }),
    }).send(res);
  };

  getallRate = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get All Rate Ok",
      metadata: await RateService.getAll(),
    }).send(res);
  };

  updateRate = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update Rate Ok",
      metadata: await RateService.update(
        { rateId: req.body.rateId },
        { ...req.body }
      ),
    }).send(res);
  };

  deleteRate = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete Rate Ok",
      metadata: await RateService.delete({ rateId: req.body.rateId }),
    }).send(res);
  };
}

export default new VoucherController();
