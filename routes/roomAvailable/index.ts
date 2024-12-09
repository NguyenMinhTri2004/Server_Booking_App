import express from "express";
import roomAvailableController from "../../controllers/roomAvailable.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = express.Router();

router.use(authentication);

router.get(
  "/roomAvailable/get",
  asyncHandler(roomAvailableController.getallRoomAvailable)
);
router.get(
  "/roomAvailable/getAllByUserId",
  asyncHandler(roomAvailableController.getallRoomAvailableByUserId)
);
router.get(
  "/roomAvailable/getAllById",
  asyncHandler(roomAvailableController.getRoomAvailabletById)
);
router.post(
  "/roomAvailable/update",
  asyncHandler(roomAvailableController.updateRoomAvailable)
);
router.post(
  "/roomAvailable/delete",
  asyncHandler(roomAvailableController.deleteRoomAvailable)
);
router.post(
  "/roomAvailable/create",
  asyncHandler(roomAvailableController.createRoomAvailable)
);

export default router;
