import keytokenModel from "../models/keytoken.model";
import { Types } from "mongoose";

class KeyToKenService {
    
    static createKeyToken = async ({userId , publicKey , privateKey , refreshToken}) => {
        try {
            // const tokens = keytokenModel.create({
            //     user : userId,
            //     publicKey,
            //     privateKey
            // })

            // let publicKeyFromData = ""

            // await tokens.then(function(result) {
            //     publicKeyFromData =  result.publicKey
            // })

            // return publicKeyFromData

            const filter = {user : userId}, update = {
                publicKey,
                privateKey,
                refreshTokenUsed : [],
                refreshToken
            },options = {upsert : true , new : true}
            

            const tokens = await keytokenModel.findOneAndUpdate(filter,update,options)

            return tokens ? tokens.publicKey : null
                
        }catch (e) {
            console.log(e);
        }
    }  

    static findByUserId = async (userId) => {
        let keyStoreDb = await keytokenModel.findOne({user: userId}).lean()
        console.log('keyStoreDb', keyStoreDb)
        return keyStoreDb
    }

    static removeKeyById = async (id) => {
        const result = await keytokenModel.deleteOne({
            _id:  new Types.ObjectId(id)
        }).lean()
        return result;
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshTokensUsed: refreshToken}).lean()
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keytokenModel.findOne({refreshToken}).lean()
    }

    static deleteKeyById = async (useId) => {
        return await keytokenModel.findByIdAndDelete({user: useId}).lean()
    }

}

export default KeyToKenService;