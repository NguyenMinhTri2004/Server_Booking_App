import express from "express";
import walletController from "../../controllers/wallet.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = express.Router();

router.use(authentication);

router.get("/wallet/get", asyncHandler(walletController.getallWallet));
router.get(
  "/wallet/getAllByUserId",
  asyncHandler(walletController.getallWalletByUserId)
);
router.get("/wallet/getAllById", asyncHandler(walletController.getWalletById));
router.post("/wallet/update", asyncHandler(walletController.updateWallet));
router.post("/wallet/delete", asyncHandler(walletController.deleteWallet));
router.post("/wallet/create", asyncHandler(walletController.createWallet));

export default router;
