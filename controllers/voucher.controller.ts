
import VoucherService from "../services/voucher.service";
import { SuccessResponse , CREATED } from "../core/success.response"

class VoucherController {
    createVoucher  = async (req , res , next) => {
        return new CREATED({
            message: "Create Voucher Ok",
            metadata : await VoucherService.create(req.body)
        }).send(res)
    };

    getallVoucherByUserId  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Voucher Ok",
            metadata : await VoucherService.get({user : req.query.userId})
        }).send(res)
    };

    getVoucherById  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Voucher Ok",
            metadata : await VoucherService.get({voucherId : req.query.voucherId}),
        }).send(res)
    };


    getallVoucher  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get All Voucher Ok",
            metadata : await VoucherService.getAll()
        }).send(res)
    };

    updateVoucher  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update Voucher Ok",
            metadata : await VoucherService.update({voucherId : req.body.voucherId} , {...req.body})
        }).send(res)
    };

    deleteVoucher  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete Voucher Ok",
            metadata :  await VoucherService.delete({voucherId : req.body.voucherId})
        }).send(res)
    };
}

export default new VoucherController()