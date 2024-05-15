import  express from 'express';
import accessController from '../../controllers/access.controller';
import { authentication } from '../../auth/authUtils';

const router = express.Router();


router.post('/signup', accessController.signUp)
router.post('/sigin', accessController.signIn)

router.use(authentication)

router.post('/logout', accessController.logOut)

router.post('/refreshToken', accessController.handleRefreshToken)

router.get('/signup', (req , res) => {
    res.status(200).json({
        message: 'AccesRouter'
    })
})

export default router