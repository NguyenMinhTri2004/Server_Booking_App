import express from "express";
import resourceController from "../../controllers/resource.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = express.Router();

router.use(authentication);

router.get("/resource/get", asyncHandler(resourceController.getallResource));
router.get(
  "/resource/getAllByUserId",
  asyncHandler(resourceController.getallResourceByUserId)
);
router.get(
  "/resource/getById",
  asyncHandler(resourceController.getResourceById)
);
router.post(
  "/resource/update",
  asyncHandler(resourceController.updateResource)
);
router.post(
  "/resource/delete",
  asyncHandler(resourceController.deleteResource)
);
router.post(
  "/resource/create",
  asyncHandler(resourceController.createResource)
);

export default router;
