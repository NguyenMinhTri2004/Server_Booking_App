import  express from 'express';
import convenientController from '../../controllers/convenient.controller';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = express.Router();

router.use(authentication)

router.get('/convenientType' , (req, res) => {
    res.status(200).json({
        message: 'Hello World!'
    })
})

router.get('/convenientType/get', asyncHandler(convenientController.getConvenientType));
router.get('/convenientType/getAll', asyncHandler(convenientController.getallConvenientType))
router.post('/convenientType/update', asyncHandler(convenientController.updateConvenientType))
router.post('/convenientType/delete', asyncHandler(convenientController.deleteConvenientType))
router.post('/convenientType/create', asyncHandler(convenientController.createConvenientType))

export default router