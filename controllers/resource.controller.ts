import ResourceService from "../services/resource.service";
import { SuccessResponse, CREATED } from "../core/success.response";

class ResourceController {
  createResource = async (req, res, next) => {
    return new CREATED({
      message: "Create Resource Ok",
      metadata: await ResourceService.create(req.body),
    }).send(res);
  };

  getallResourceByUserId = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Resource Ok",
      metadata: await ResourceService.get({ userId: req.query.userId }),
    }).send(res);
  };

  getResourceById = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Resource Ok",
      metadata: await ResourceService.get({ rateId: req.query.rateId }),
    }).send(res);
  };

  // getResourceByAccommodation  = async (req , res , next) => {
  //     return new SuccessResponse({
  //         message: "Get Resource Ok",
  //         metadata : await ResourceService.get({accomodationId : req.query.accomodationId}),
  //     }).send(res)
  // };

  getallResource = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get All Resource Ok",
      metadata: await ResourceService.getAll({ userId: req.params.user }),
    }).send(res);
  };

  updateResource = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update Resource Ok",
      metadata: await ResourceService.update(
        { rateId: req.body.rateId },
        { ...req.body }
      ),
    }).send(res);
  };

  deleteResource = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete Resource Ok",
      metadata: await ResourceService.delete({ rateId: req.body.rateId }),
    }).send(res);
  };
}

export default new ResourceController();
