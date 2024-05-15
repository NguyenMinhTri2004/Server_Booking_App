
import { SuccessResponse , CREATED } from "../core/success.response"
import WalletService from "../services/wallet.service";

class WalletController {
    createWallet  = async (req , res , next) => {
        return new CREATED({
            message: "Create Wallet Ok",
            metadata : await WalletService.create(req.body)
        }).send(res)
    };

    getallWalletByUserId  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Wallet Ok",
            metadata : await WalletService.get({user : req.query.userId})
        }).send(res)
    };

    getWalletById  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Wallet Ok",
            metadata : await WalletService.get({walletId : req.query.walletId}),
        }).send(res)
    };


    getallWallet  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get All Wallet Ok",
            metadata : await WalletService.getAll()
        }).send(res)
    };

    updateWallet  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update Wallet Ok",
            metadata : await WalletService.update({walletId : req.body.walletId} , {...req.body})
        }).send(res)
    };

    deleteWallet  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete Wallet Ok",
            metadata :  await WalletService.delete({walletId : req.body.walletId})
        }).send(res)
    };
}

export default new WalletController()