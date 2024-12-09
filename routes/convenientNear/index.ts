import express from "express";
import convenientNearController from "../../controllers/convenientNear.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = express.Router();

// router.use(authentication);

router.post(
  "/convenientNear/create",
  asyncHandler(convenientNearController.createConvenient)
);
router.get(
  "/convenientNear/get",
  asyncHandler(convenientNearController.getConvenient)
);
router.get(
  "/convenientNear/getAll",
  asyncHandler(convenientNearController.getallConvenient)
);
router.post(
  "/convenientNear/update",
  asyncHandler(convenientNearController.updateConvenient)
);
router.post(
  "/convenientNear/delete",
  asyncHandler(convenientNearController.deleteConvenient)
);

export default router;
