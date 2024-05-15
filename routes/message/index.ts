import  express from 'express';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';
import messageController from '../../controllers/message.controller';

const router = express.Router();

router.use(authentication)

router.get('/comment/get', asyncHandler(messageController.getallMessage))
router.get('/comment/getAllByUserId', asyncHandler(messageController.getallMessageByUserId))
router.get('/comment/getById', asyncHandler(messageController.getMessagetById))
router.post('/comment/update', asyncHandler(messageController.updateMessage))
router.post('/comment/delete', asyncHandler(messageController.deleteMessage))
router.post('/comment/create', asyncHandler(messageController.createMessage))

export default router