import  express from 'express';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';
import commentController from '../../controllers/comment.controller';

const router = express.Router();

router.use(authentication)

router.get('/comment/get', asyncHandler(commentController.getallComment))
router.get('/comment/getAllByUserId', asyncHandler(commentController.getallCommentByUserId))
router.get('/comment/getAllById', asyncHandler(commentController.getCommentById))
router.post('/comment/update', asyncHandler(commentController.updateComment))
router.post('/comment/delete', asyncHandler(commentController.deleteComment))
router.post('/comment/create', asyncHandler(commentController.createComment))

export default router