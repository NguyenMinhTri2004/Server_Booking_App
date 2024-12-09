import express from "express";
import orderController from "../../controllers/order.controller";
import { authentication } from "../../auth/authUtils";
import { asyncHandler } from "../../helpers/asyncHandler";
import { grantAccess } from "../../middlewares/rbac";
const router = express.Router();

// router.use(authentication);

// router.get('/convenientType' , (req, res) => {
//     res.status(200).json({
//         message: 'Hello World!'
//     })
// })

router.get(
  "/order/get",
  grantAccess("readAny", "order"),
  asyncHandler(orderController.getOrder)
);
router.get(
  "/order/getAllByUserId",
  asyncHandler(orderController.getallOrderByUserId)
);
router.get("/order/getAll", asyncHandler(orderController.getallOrder));
router.post("/order/update", asyncHandler(orderController.updateOrder));
router.post("/order/delete", asyncHandler(orderController.deleteOrder));
router.post("/order/create", asyncHandler(orderController.createOrder));
router.post("/order/create", asyncHandler(orderController.orderReview));
router.post("/order/orderReview", asyncHandler(orderController.orderReview));
router.post("/order/orderByUser", asyncHandler(orderController.orderByUser));

export default router;
