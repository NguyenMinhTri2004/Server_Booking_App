import ConvenientNearService from "../services/convenientNear.service";
import ConvenientNearTypeService from "../services/convenientNearTyppe.service";
import { SuccessResponse, CREATED } from "../core/success.response";

class ConvenientNearController {
  createConvenient = async (req, res, next) => {
    return new CREATED({
      message: "Create Convenient Ok",
      metadata: await ConvenientNearService.create(req.body),
    }).send(res);
  };

  getConvenient = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Convenient Ok",
      metadata: await ConvenientNearService.get({
        typeConvenientNearId: req.query.typeConvenientNearId,
      }),
    }).send(res);
  };

  getallConvenient = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get All Convenient Ok",
      metadata: await ConvenientNearService.getAll(),
    }).send(res);
  };

  updateConvenient = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update Convenient Ok",
      metadata: await ConvenientNearService.update(
        { convenientId: req.body.convenientId },
        { ...req.body }
      ),
    }).send(res);
  };

  deleteConvenient = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete Convenient Ok",
      metadata: await ConvenientNearService.delete({
        convenientId: req.body.convenientId,
      }),
    }).send(res);
  };

  createConvenientType = async (req, res, next) => {
    return new CREATED({
      message: "Create ConvenientType Ok",
      metadata: await ConvenientNearTypeService.create(req.body),
    }).send(res);
  };

  deleteConvenientType = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete ConvenientType Ok",
      metadata: await ConvenientNearTypeService.delete({
        convenientTypeId: req.body.convenientTypeId,
      }),
    }).send(res);
  };

  getConvenientType = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get ConvenientType Ok",
      metadata: await ConvenientNearTypeService.get({
        convenientTypeId: req.query.convenientTypeId,
      }),
    }).send(res);
  };

  getallConvenientType = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get all ConvenientType Ok",
      metadata: await ConvenientNearTypeService.getAll(),
    }).send(res);
  };

  updateConvenientType = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update ConvenientType Ok",
      metadata: await ConvenientNearTypeService.update(
        { convenientTypeId: req.body.convenientTypeId },
        { ...req.body }
      ),
    }).send(res);
  };
}

export default new ConvenientNearController();
