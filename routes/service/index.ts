import express from "express";
import serviceController from "../../controllers/service.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = express.Router();

router.use(authentication);

router.post(
  "/convenient/create",
  asyncHandler(serviceController.createService)
);
router.get("/convenient/get", asyncHandler(serviceController.getService));
router.get("/convenient/getAll", asyncHandler(serviceController.getallService));
router.post(
  "/convenient/update",
  asyncHandler(serviceController.updateService)
);
router.post(
  "/convenient/delete",
  asyncHandler(serviceController.deleteService)
);

export default router;
