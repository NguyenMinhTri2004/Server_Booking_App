
import DetailOrderService from "../services/detailOrder.service";
import { SuccessResponse , CREATED } from "../core/success.response"

class DetailOrderController {
    createDetailOrder  = async (req , res , next) => {
        return new CREATED({
            message: "Create DetailOrder Ok",
            metadata : await DetailOrderService.create(req.body)
        }).send(res)
    };

    getDetailOrder  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get DetailOrder Ok",
            metadata : await DetailOrderService.get({detailOrderId : req.query.detailOrderId})
        }).send(res)
    };


    getallDetailOrderByUserId  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get DetailOrder Ok",
            metadata : await DetailOrderService.get({user : req.query.userId})
        }).send(res)
    };

    getallDetailOrderByOrderId  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get DetailOrder Ok",
            metadata : await DetailOrderService.get({orderId : req.query.orderId})
        }).send(res)
    };


    getallDetailOrder  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get All Order Ok",
            metadata : await DetailOrderService.getAll()
        }).send(res)
    };

    updateDetailOrder  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update Order Ok",
            metadata : await DetailOrderService.update({detailOrderId : req.body.detailOrderId} , {...req.body})
        }).send(res)
    };

    deleteDetailOrder  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete Room Ok",
            metadata :  await DetailOrderService.delete({detailOrderId : req.body.detailOrderId})
        }).send(res)
    };
}

export default new DetailOrderController()