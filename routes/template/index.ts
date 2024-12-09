import express from "express";
import templateController from "../../controllers/template.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = express.Router();

// router.use(authentication);

// router.get('/convenientType' , (req, res) => {
//     res.status(200).json({
//         message: 'Hello World!'
//     })
// })

router.post(
  "/template/create",
  asyncHandler(templateController.createTemplate)
);
router.get("/template/get", asyncHandler(templateController.getTemplate));

export default router;
