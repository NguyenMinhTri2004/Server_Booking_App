import templateEmailModel from "../models/templateEmail.model";
import { temLogin, temPassword } from "../utils/template";

class TemplateService {
  static get = async (query) => {
    return await templateEmailModel.findOne(query).lean();
  };

  static getAll = async () => {
    return await templateEmailModel.find().lean();
  };

  static create = async (data) => {
    return await templateEmailModel.create(data);
  };

  static update = async (query, queryUpdate) => {
    return await templateEmailModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await templateEmailModel.findOneAndDelete(query).lean();
  };

  static newTemplateEmail = async ({ name, html }) => {
    const newTemplateEmail = await templateEmailModel.create({
      name,
      html: temPassword(),
    });

    return newTemplateEmail;
  };

  static getTemplateEmail = async ({ name }) => {
    const foundTemplate = await templateEmailModel.findOne({ name });

    return foundTemplate;
  };
}

export default TemplateService;
