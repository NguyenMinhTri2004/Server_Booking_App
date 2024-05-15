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

router.get('/room/get', asyncHandler(roomController.getRoom));
router.get('/room/getAll', asyncHandler(roomController.getallRoom))
router.post('/room/update', asyncHandler(roomController.updateRoom))
router.post('/room/delete', asyncHandler(roomController.deleteRoom))
router.post('/room/create', asyncHandler(roomController.createRoom))

export default router