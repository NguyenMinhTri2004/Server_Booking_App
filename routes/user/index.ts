import express from "express";
import userController from "../../controllers/user.controller";
import { body } from "express-validator";

const router = express.Router();

router.post("/user/create", userController.create);
router.get("/user/getById", userController.getByUserId);
router.post("/user/update", userController.updateUser);
router.post("/user/delete", userController.deleteUser);
router.post(
  "/user/reset-password",
  body("email").isEmail(),
  userController.resetPassword
);
router.post(
  "/user/newUserByEmail",
  body("email").isEmail(),
  userController.newUserByEmail
);
router.get("/user/checkLoginEmailToken", userController.checkLoginEmailToken);

router.get(
  "/user/checkResetPasswordToken",
  body("token").notEmpty(),
  body("newPassword1").notEmpty(),
  body("newPassword2").notEmpty(),
  userController.checkResetPasswordEmailToken
);

router.get("/user", (req, res) => {
  res.status(200).json({
    message: "userRouter",
  });
});

export default router;
