import  express from 'express';
import notifyController from '../../controllers/notify.controller';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = express.Router();

router.use(authentication)

router.get('/notify/get', asyncHandler(notifyController.getallNotify))
router.get('/notify/getAllByUserId', asyncHandler(notifyController.getallNotifyrByUserId))
router.get('/notify/getAllById', asyncHandler(notifyController.getNotifyById))
router.post('/notify/update', asyncHandler(notifyController.updateNotify))
router.post('/notify/delete', asyncHandler(notifyController.deleteNotify))
router.post('/notify/create', asyncHandler(notifyController.createNotify))

export default router