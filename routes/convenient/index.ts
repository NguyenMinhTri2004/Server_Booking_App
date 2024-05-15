import  express from 'express';
import convenientController from '../../controllers/convenient.controller';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = express.Router();

router.use(authentication)

router.post('/convenient/create', asyncHandler(convenientController.createConvenient))
router.get('/convenient/get', asyncHandler(convenientController.getConvenient))
router.get('/convenient/getAll', asyncHandler(convenientController.getallConvenient))
router.post('/convenient/update', asyncHandler(convenientController.updateConvenient))
router.post('/convenient/delete', asyncHandler(convenientController.deleteConvenient))





export default router