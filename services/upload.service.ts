import templateEmailModel from "../models/templateEmail.model";
import { temLogin, temPassword } from "../utils/template";
import cloudinary from "../configs/cloudinary.config";
import { generateID } from "../utils";

class UploadService {
  static uploadImageFromUrl = async (url, accommodationId) => {
    try {
      const urlImage = url;
      const folderName = `accommodation/${accommodationId}`;

      const result = await cloudinary.uploader.upload(urlImage, {
        folder: folderName,
      });

      console.log(result);

      return result;
    } catch (err) {
      console.error(err);
    }
  };

  static uploadImageFromLocal = async ({ path, folderName}) => {
    try {
      const randomId = generateID()
      const result = await cloudinary.uploader.upload(path, {
        public_id: randomId,
        folder: folderName,
      });

      console.log(result);

      return {
        image_url: result.secure_url,
        thumb_url: await cloudinary.url(result.public_id, {
          height: 100,
          weight: 100,
          format: "jpg",
        }),
      };
    } catch (err) {
      console.error(err);
    }
  };
}

export default UploadService;
