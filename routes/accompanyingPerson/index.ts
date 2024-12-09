import express from "express";
import accompanyingPersonController from "../../controllers/accompanyingPerson.controller";
import { body } from "express-validator";

const router = express.Router();

router.post("/accompanyingPerson/create", accompanyingPersonController.create);
router.get("/accompanyingPerson/getById", accompanyingPersonController.getByUserId);
router.post("/accompanyingPerson/update", accompanyingPersonController.updateAccompanyingPerson);
router.post("/accompanyingPerson/delete", accompanyingPersonController.deleteAccompanyingPerson);

router.get("/user", (req, res) => {
  res.status(200).json({
    message: "userRouter",
  });
});

export default router;
