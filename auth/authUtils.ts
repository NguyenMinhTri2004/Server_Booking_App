import jwt from 'jsonwebtoken';
import { asyncHandler } from '../helpers/asyncHandler';
import { AuthFailureError , NotFoundError } from '../core/error.response';
import KeyToKenService from '../services/keyToken.service';

const HEADER= {
    'API_KEY': 'x-api-key',
    'CLIENT_KEY': 'x-client-id',
    'AUTHORIZATION': 'authorization',
}

const createTokenPair = async(payload , publicKey, privateKey) => {
    try {
       const accessToken = await jwt.sign(payload, publicKey , {
            expiresIn: '2 days',
            algorithm : 'HS256'
       })

       const refreshToken = await jwt.sign(payload, privateKey , {
            expiresIn: '7 days',
            algorithm : 'HS256'
        })

        jwt.verify(accessToken, publicKey, (err, decode) => {
            if(err){
                console.log('Error vertify' , err)
            }else{
                console.log('decode ver=tify' , decode)
            }
        })
        return {
            accessToken,
            refreshToken
        }
    }catch (err) {

    }
}

const authentication = asyncHandler(async(req, res, next) => {
    const useId = req.headers[HEADER.CLIENT_KEY]
    if(!useId) {
        throw new AuthFailureError('Invalid request')
    }

    const keyStore : any = await KeyToKenService.findByUserId(useId)

    if(!keyStore){
        throw new  NotFoundError('Invalid request')
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]

    if(!accessToken){
        throw new AuthFailureError('Invalid request')
    }

    console.log('Access token' + accessToken)
    console.log('keyStore' + keyStore.privateKey)
    

    try {
        const decodeUser : any = await jwt.verify(accessToken, keyStore.privateKey)
        if(useId !== decodeUser.userId){
            throw new AuthFailureError('Invalid request')
        }

        req.keyStore = keyStore
        return next()
        
    }catch(err){
        console.log('Error vertify', err)
    }
})

const verifyJWT = async (token : any , keySecret : any) => {
    console.log("token" , typeof(token))
    console.log("keySecret" , typeof(keySecret))
    return await jwt.verify(token, keySecret)
}

export {
    createTokenPair,
    authentication,
    verifyJWT
}