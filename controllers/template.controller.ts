import { SuccessResponse, CREATED } from "../core/success.response";
import TemplateService from "../services/template.service";

class TemplateController {
  createTemplate = async (req, res, next) => {
    return new CREATED({
      message: "Create Template Ok",
      metadata: await TemplateService.newTemplateEmail(req.body),
    }).send(res);
  };

  getTemplate = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Template Ok",
      metadata: await TemplateService.getTemplateEmail(req.body),
    }).send(res);
  };
}

export default new TemplateController();
