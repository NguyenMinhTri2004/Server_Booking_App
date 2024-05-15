import  express from 'express';
import roomController from '../../controllers/room.controller';
import { authentication } from '../../auth/authUtils';
import { asyncHandler } from '../../helpers/asyncHandler';

const router = express.Router();

router.use(authentication)

// router.get('/convenientType' , (req, res) => {
//     res.status(200).json({
//         message: 'Hello World!'
//     })
// })

router.get('/roomType/get', asyncHandler(roomController.getRoomType));
router.get('/roomType/getAll', asyncHandler(roomController.getRoomType))
router.post('/roomType/update', asyncHandler(roomController.updateRoomType))
router.post('/roomType/delete', asyncHandler(roomController.deleteRoomType))
router.post('/roomType/create', asyncHandler(roomController.createRoomType))

export default router