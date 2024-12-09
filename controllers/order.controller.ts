import OrderService from "../services/order.service";
import { SuccessResponse, CREATED } from "../core/success.response";

class OrderController {
  createOrder = async (req, res, next) => {
    return new CREATED({
      message: "Create Order Ok",
      metadata: await OrderService.create(req.body),
    }).send(res);
  };

  getOrder = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Order Ok",
      metadata: await OrderService.get({ orderId: req.query.orderId }),
    }).send(res);
  };

  getallOrderByUserId = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Order Ok",
      metadata: await OrderService.get({ userId: req.query.user }),
    }).send(res);
  };

  getallOrder = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get All Order Ok",
      metadata: await OrderService.getAll(),
    }).send(res);
  };

  updateOrder = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update Order Ok",
      metadata: await OrderService.update(
        { orderId: req.body.orderId },
        { ...req.body }
      ),
    }).send(res);
  };

  deleteOrder = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete Room Ok",
      metadata: await OrderService.delete({ orderId: req.body.orderId }),
    }).send(res);
  };

  orderReview = async (req, res, next) => {
    return new SuccessResponse({
      message: "order review Ok",
      metadata: await OrderService.orderReview(req.body),
    }).send(res);
  };

  orderByUser = async (req, res, next) => {
    return new SuccessResponse({
      message: "order by user Ok",
      metadata: await OrderService.orderByUser(req.body),
    }).send(res);
  };
}

export default new OrderController();
