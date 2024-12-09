import express from "express";
import rateController from "../../controllers/rate.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = express.Router();

router.use(authentication);

router.get("/rate/get", asyncHandler(rateController.getallRate));
router.get(
  "/rate/getAllByUserId",
  asyncHandler(rateController.getallRateByUserId)
);
router.get(
  "/rate/getAllByAccommodation",
  asyncHandler(rateController.getRateByAccommodation)
);
router.get("/rate/getById", asyncHandler(rateController.getRateById));
router.post("/rate/update", asyncHandler(rateController.updateRate));
router.post("/rate/delete", asyncHandler(rateController.deleteRate));
router.post("/rate/create", asyncHandler(rateController.createRate));

export default router;
