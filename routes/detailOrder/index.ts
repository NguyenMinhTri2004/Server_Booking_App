import  express from 'express';
import detailOrderController from '../../controllers/detailOrder.controller';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = express.Router();

router.use(authentication)

// router.get('/convenientType' , (req, res) => {
//     res.status(200).json({
//         message: 'Hello World!'
//     })
// })

router.get('/detailOrder/get', asyncHandler(detailOrderController.getDetailOrder))
router.get('/detailOrder/getAllByUserId', asyncHandler(detailOrderController.getallDetailOrderByUserId))
router.get('/detailOrder/getAllByOrderId', asyncHandler(detailOrderController.getallDetailOrderByOrderId))
router.post('/detailOrder/update', asyncHandler(detailOrderController.updateDetailOrder))
router.post('/detailOrder/delete', asyncHandler(detailOrderController.deleteDetailOrder))
router.post('/detailOrder/create', asyncHandler(detailOrderController.createDetailOrder))

export default router