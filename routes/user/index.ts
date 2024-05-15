import  express from 'express';
import userController from '../../controllers/user.controller';


const router = express.Router();

router.post('/user/create', userController.create)
router.get('/user/getById', userController.getByUserId)
router.post('/user/update', userController.updateUser)
router.post('/user/delete', userController.deleteUser)
router.post('/user/forgot-password', userController.forgotPassword)

router.get('/user', (req , res) => {
    res.status(200).json({
        message: 'userRouter'
    })
})

export default router