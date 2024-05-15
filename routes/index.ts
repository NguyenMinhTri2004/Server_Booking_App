import express from 'express';
import accessRouter from './access';
import userRouter from './user';
import accommotionRouter from "./acommotion";
import accommotionTypeRouter from "./acommotionType";
import convenientTypeRouter from "./convenientType";
import serviceTypeRouter from "./serviceType";
import roomTypeRouter from "./roomType";
import convenientRouter from "./convenient";
import serviceRouter from "./service";
import roomRouter from "./room";
import orderRouter from "./order";
import detailOrderRouter from "./detailOrder";
import voucherRouter from "./voucher";
import rateRouter from "./rate";
import commentRouter from "./comment";
import messageRouter from "./message";
import conversationRouter from './conversation';
import pointRouter from './point';
import walletRouter from './wallet';


const router = express.Router();

router.use('/v1/api' , accessRouter)
router.use('/v1/api' , userRouter)
router.use('/v1/api' , accommotionRouter)
router.use('/v1/api' , accommotionTypeRouter)
router.use('/v1/api' , convenientTypeRouter)
router.use('/v1/api' , convenientRouter)
router.use('/v1/api' , serviceTypeRouter)
router.use('/v1/api' , serviceRouter)
router.use('/v1/api' , roomTypeRouter)
router.use('/v1/api' , roomRouter)
router.use('/v1/api' , orderRouter)
router.use('/v1/api' , detailOrderRouter)
router.use('/v1/api' , voucherRouter)
router.use('/v1/api' , rateRouter)
router.use('/v1/api' , commentRouter)
router.use('/v1/api' , messageRouter)
router.use('/v1/api' , conversationRouter)
router.use('/v1/api' , pointRouter)
router.use('/v1/api' , walletRouter)



router.get('/' , (req, res) => {
    res.status(200).json({
        message: 'Hello World!'
    })
})

export default router;