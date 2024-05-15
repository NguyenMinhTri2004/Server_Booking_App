import  express from 'express';
import voucherController from '../../controllers/voucher.controller';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = express.Router();

router.use(authentication)

router.get('/voucher/get', asyncHandler(voucherController.getallVoucher))
router.get('/voucher/getAllByUserId', asyncHandler(voucherController.getallVoucherByUserId))
router.get('/voucher/getAllById', asyncHandler(voucherController.getVoucherById))
router.post('/voucher/update', asyncHandler(voucherController.updateVoucher))
router.post('/voucher/delete', asyncHandler(voucherController.deleteVoucher))
router.post('/voucher/create', asyncHandler(voucherController.createVoucher))

export default router