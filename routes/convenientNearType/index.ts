import express from "express";
import convenientNearController from "../../controllers/convenientNear.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = express.Router();

// router.use(authentication);

router.get("/convenientNearType", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

router.get(
  "/convenientNearType/get",
  asyncHandler(convenientNearController.getConvenientType)
);
router.get(
  "/convenientNearType/getAll",
  asyncHandler(convenientNearController.getallConvenientType)
);
router.post(
  "/convenientNearType/update",
  asyncHandler(convenientNearController.updateConvenientType)
);
router.post(
  "/convenientNearType/delete",
  asyncHandler(convenientNearController.deleteConvenientType)
);
router.post(
  "/convenientNearType/create",
  asyncHandler(convenientNearController.createConvenientType)
);

export default router;
