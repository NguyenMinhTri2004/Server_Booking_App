import express from "express";
import accommodationController from "../../controllers/accommodation.controller.";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";
import { body } from "express-validator";

const router = express.Router();

// router.use(authentication);

router.post(
  "/accommodation/create",
  body("type").notEmpty(),
  asyncHandler(accommodationController.createAccommodation)
);
router.get(
  "/accommodation/get",
  asyncHandler(accommodationController.getAccommodation)
);


router.get(
  "/accommodation/accommodationNear",
  asyncHandler(accommodationController.getAccommodationNear)
);

router.get(
  "/accommodation/search",
  asyncHandler(accommodationController.searchAccommodation)
);

router.get(
  "/accommodation/getBySlug",
  asyncHandler(accommodationController.getAccommodationBySlug)
);
router.get(
  "/accommodation/getAll",
  asyncHandler(accommodationController.getallAccommodation)
);
router.post(
  "/accommodation/update",
  asyncHandler(accommodationController.updateAccommodation)
);
router.post(
  "/accommodation/delete",
  asyncHandler(accommodationController.deleteAccommodation)
);

export default router;
