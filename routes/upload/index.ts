import express from "express";
import uploadController from "../../controllers/upload.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";
import { body } from "express-validator";
import { upLoadDisk } from "../../configs/multer.config";

const router = express.Router();

// router.use(authentication);

// router.get('/convenientType' , (req, res) => {
//     res.status(200).json({
//         message: 'Hello World!'
//     })
// })

router.post(
  "/upload/accommodation",
  body("image").notEmpty(),
  body("accommodationId").notEmpty(),
  asyncHandler(uploadController.uploadAccommodationImage)
);

router.post(
  "/upload/accommodation/thumb",
  upLoadDisk.single('file'),
  // body("image").notEmpty(),
  // body("accommodationId").notEmpty(),
  asyncHandler(uploadController.uploadAccommodationImageThumb)
);

router.post(
  "/upload/user/avatar",
  upLoadDisk.single('file'),
  // body("image").notEmpty(),
  // body("accommodationId").notEmpty(),
  asyncHandler(uploadController.uploadAvatar)
);


export default router;
