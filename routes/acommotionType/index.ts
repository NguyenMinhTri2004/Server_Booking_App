import express from "express";
import accommodationController from "../../controllers/accommodation.controller.";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = express.Router();

// router.use(authentication);

router.get(
  "/accommodationType/get",
  asyncHandler(accommodationController.getAcommodationType)
);
router.get(
  "/accommodationType/getAll",
  asyncHandler(accommodationController.getallAcommodationType)
);
router.post(
  "/accommodationType/update",
  asyncHandler(accommodationController.updateAcommodationType)
);
router.post(
  "/accommodationType/delete",
  asyncHandler(accommodationController.deleteAccommodationType)
);
router.post(
  "/accommodationType/create",
  asyncHandler(accommodationController.createAccommodationType)
);

export default router;
