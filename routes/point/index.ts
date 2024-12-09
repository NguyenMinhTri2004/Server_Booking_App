import express from "express";
import pointController from "../../controllers/point.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = express.Router();

router.use(authentication);

router.get("/point/get", asyncHandler(pointController.getallPoint));
router.get(
  "/point/getAllByUserId",
  asyncHandler(pointController.getallPointByUserId)
);
router.get("/point/getById", asyncHandler(pointController.getPointById));
router.post("/point/update", asyncHandler(pointController.updatePoint));
router.post("/point/delete", asyncHandler(pointController.deletePoint));
router.post("/point/create", asyncHandler(pointController.createPoint));

export default router;
