import express from "express";
import accessController from "../../controllers/access.controller";
import { authentication } from "../../auth/authUtils";
// import {
//   middlewareGoogleAuth,
//   middlewareGoogleRequest,
// } from "../../middlewares/oauth2/google";
// import {
//   middlewareFacebookAuth,
//   middlewareFacebookRequest,
// } from "../../middlewares/oauth2/facebook";

const router = express.Router();

router.post("/signup", accessController.signUp);
router.post("/sigin", accessController.signIn);
// router.post(
//   "/signInWithFacebook",
//   middlewareFacebookAuth,
//   accessController.signInWithFacebook
// );
// router.post("/signInWithGoogle", accessController.signInWithGoogle);

// router.use(authentication);

router.post("/logout", accessController.logOut);

router.post("/refreshToken", accessController.handleRefreshToken);

router.get("/signup", (req, res) => {
  res.status(200).json({
    message: "AccesRouter",
  });
});

export default router;
