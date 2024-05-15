import  express from 'express';
import accommodationController from '../../controllers/accommodation.controller.';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = express.Router();

router.use(authentication)

router.post('/accommodation/create', asyncHandler(accommodationController.createAccommodation))
router.get('/accommodation/get', asyncHandler(accommodationController.getAccommodation))
router.get('/accommodation/getAll', asyncHandler(accommodationController.getallAccommodation))
router.post('/accommodation/update', asyncHandler(accommodationController.updateAccommodation))
router.post('/accommodation/delete', asyncHandler(accommodationController.deleteAccommodation))





export default router