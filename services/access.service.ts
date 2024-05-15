import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import KeyToKenService from "./keyToken.service";
import { createTokenPair, verifyJWT } from "../auth/authUtils";
import { getInfoData } from "../utils";
import UserService from "./user.service";
import { BadRequestError , AuthFailureError , ForbiddenError } from "../core/error.response";
import { token } from "morgan";


class AccessService {
    static signUp = async ({email , name , password , avatar , phoneNumber , refreshToken = null}) => {
        try {
            console.log("email", email)

            console.log("name", name)

            const userExit =  await userModel.findOne({ email }).lean();

            console.log("userExit: " + userExit)

            if(userExit) {
               return {
                   status: 400,
                   message: "Email already exists"
               }
            }
   
            const passwordHash = await bcrypt.hash(password , 10);
   
            const newUser = await userModel.create({email, name , password: passwordHash , avatar , phoneNumber });

            if(newUser) {
                // const {privateKey , publicKey} = crypto.generateKeyPairSync('rsa' , {
                //     modulusLength: 4096,
                //     publicKeyEncoding : {
                //         type:'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding : {
                //         type:'pkcs1',
                //         format: 'pem'
                //     }
                // });

                const privateKey = crypto.randomBytes(64).toString("hex");
                const publicKey = crypto.randomBytes(64).toString("hex");

                const keyUser = await KeyToKenService.createKeyToken({
                    userId: newUser.userId,
                    publicKey,
                    privateKey,
                    refreshToken
                })

                console.log("Public Key String: " + keyUser)


                if(!keyUser){
                    return {
                        code : "xxx",
                        message: "Something went wrong"
                    }
                }

                // const publicKeyObject = crypto.createPublicKey(keyUser)

                // console.log("publicKeyObject" , publicKeyObject )

                // create token pair

                const tokens = await createTokenPair({userId: newUser.userId, email } , publicKey , privateKey)

                console.log("creating token pair" , tokens)

                return {
                   code : 201,
                   metadata : {
                      user :  getInfoData({fields : ['userId', 'name' , 'email'] , object : newUser}),
                      tokens
                   }
                }
            }

        }catch (e) {
            console.log(e);
        } 
         
    }

    static signIn = async ({email , password , refreshToken = null}) => {
           const foundUser = await UserService.findByEmail({email});
           if(!foundUser){
              throw new BadRequestError('Tk ko ton tai')
           }

           console.log("foundUser " , foundUser)


           console.log("PasswordDb " , foundUser.password)

           const math = bcrypt.compare(password, foundUser.password)

           if(!math) {
               throw new AuthFailureError('Tk hoac mk ko dung')
           }

           const privateKey = crypto.randomBytes(64).toString("hex");
           const publicKey = crypto.randomBytes(64).toString("hex");

           const tokens = await createTokenPair({userId : foundUser.userId , email} , privateKey, publicKey)

           console.log("Token" , tokens)

           await KeyToKenService.createKeyToken({
                userId: foundUser.userId,
                publicKey,
                privateKey,
                refreshToken : tokens.refreshToken,
           })

           return{
              user :  getInfoData({fields : ['userId', 'name' , 'email'] , object : foundUser}),
              tokens
           }

    }     
    
    static logOut = async (keyStore) => {
        const delKey = await KeyToKenService.removeKeyById(keyStore._id)
        return delKey
    }    

    static handleRefreshToken = async (refreshToken) => {
        // check xem token nay da duoc dung chua
        const foundToken = await KeyToKenService.findByRefreshTokenUsed(refreshToken)
        if(foundToken) {
            console.log("found token" + foundToken)
            //check xem la ai
            const {userId, email} = await verifyJWT(refreshToken, foundToken.publicKey) as { userId: string; email: string };
            console.log({ userId, email })
            // xoa tat ca token trong keytore
            await KeyToKenService.deleteKeyById(userId)
            throw new ForbiddenError('Pl rea login')
        }


        const holderToken = await KeyToKenService.findByRefreshToken(refreshToken)


        if(!holderToken) {
            throw new AuthFailureError('User not dk 1')
        }

        // veriy Token
        

        console.log("holderToken" , holderToken)

        console.log("refreshToken" , refreshToken)

        console.log("holderToken.privateKey" , holderToken.privateKey)

        const {userId, email} = await verifyJWT(refreshToken, holderToken.publicKey) as { userId: string; email: string };


        console.log({ userId, email })

        // check userid

        const foundUser = await UserService.findByEmail({email})

        console.log()

        if(!foundUser) {
            throw new AuthFailureError('User not dk 2')
        }

        //tao 1 cap token moi

        const tokens = await createTokenPair({userId , email} , holderToken.publicKey , holderToken.privateKey)

        //updateToken

        await holderToken.updateOne(
            {
                $set: {
                    refreshToken : tokens.refreshToken
                },
    
                $addToSet: {
                    refreshTokensUsed : refreshToken // da duoc dung de lay 1 cap token moi
                }
            }
           
        )

        return {
            user : {userId , email},
            tokens
        }
    }    
}

export default AccessService;