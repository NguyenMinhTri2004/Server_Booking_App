import  express from 'express';
import conversationController from '../../controllers/conversation.controller';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = express.Router();

router.use(authentication)

router.get('/conversation/get', asyncHandler(conversationController.getallConvenrsation))
router.get('/conversation/getAllByUserId', asyncHandler(conversationController.getallConvenrsationByUserId))
router.get('/conversation/getById', asyncHandler(conversationController.getConvenrsationById))
router.post('/conversation/update', asyncHandler(conversationController.updateConvenrsation)) 
router.post('/conversation/delete', asyncHandler(conversationController.deleteConvenrsation))
router.post('/conversation/create', asyncHandler(conversationController.createConvenrsation))

export default router