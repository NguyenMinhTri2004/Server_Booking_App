import express from "express";
import cardController from "../../controllers/card.controller";
import { body } from "express-validator";

const router = express.Router();

router.post("/card/create", cardController.create);
router.get("/card/getById", cardController.getByUserId);
router.post("/card/update", cardController.updateCard);
router.post("/card/delete", cardController.deleteCard);

router.get("/user", (req, res) => {
  res.status(200).json({
    message: "userRouter",
  });
});

export default router;
