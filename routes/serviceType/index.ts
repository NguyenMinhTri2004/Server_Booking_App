import  express from 'express';
import serviceController from '../../controllers/service.controller';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = express.Router();

router.use(authentication)

// router.get('/convenientType' , (req, res) => {
//     res.status(200).json({
//         message: 'Hello World!'
//     })
// })

router.get('/serviceType/get', asyncHandler(serviceController.getServiceType));
router.get('/serviceType/getAll', asyncHandler(serviceController.getallServiceType))
router.post('/serviceType/update', asyncHandler(serviceController.updateServiceType))
router.post('/serviceType/delete', asyncHandler(serviceController.deleteServiceType))
router.post('/serviceType/create', asyncHandler(serviceController.createServiceType))

export default router