import UploadService from "../services/upload.service";
import { SuccessResponse, CREATED } from "../core/success.response";
import { BadRequestError } from "../core/error.response";

class UploadController {
  uploadAccommodationImage = async (req, res, next) => {
    return new SuccessResponse({
      message: "Upload Image Accommodation Ok",
      metadata: await UploadService.uploadImageFromUrl(
        req?.body?.image,
        req?.body?.accommodationId
      ),
    }).send(res);
  };

  uploadAccommodationImageThumb = async (req, res, next) => {
    const { file } = req;
    if (!file) {
      throw new BadRequestError("Not found file");
    }

    return new SuccessResponse({
      message: "Upload Image Accommodation Thumb Ok",
      metadata: await UploadService.uploadImageFromLocal({ path: file.path, folderName : "Accommodation"}),
    }).send(res);
  };

  uploadAvatar = async (req, res, next) => {
    const { file } = req;
    if (!file) {
      throw new BadRequestError("Not found file");
    }

    return new SuccessResponse({
      message: "Upload Avatar Ok",
      metadata: await UploadService.uploadImageFromLocal({ path: file.path, folderName : "User" }),
    }).send(res);
  };
}

export default new UploadController();
