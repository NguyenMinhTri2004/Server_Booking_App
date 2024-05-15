import UserService from "../services/user.service"
import { SuccessResponse , CREATED } from "../core/success.response"


const HEADER= {
    'API_KEY': 'x-api-key',
    'CLIENT_KEY': 'x-client-id',
    'AUTHORIZATION': 'authorization',
}

class UserController {
    create = async (req , res , next) => {
         try {
          console.log("Create requet " , req.body)
           return new CREATED ({
               message: "Create U Ok",
               metadata : await UserService.create(req.body)
           }).send(res)
         }catch (e) {
            console.error(e)
        }
    };

    getByUserId = async (req , res , next) => {
        try {
          console.log("Create requet " , req?.query?.userId)
          return new SuccessResponse ({
              message: "get User Success",
              metadata : await UserService.findOne({userId :req?.query?.userId})
          }).send(res)
        }catch (e) {
           console.error(e)
       }
   };

   updateUser = async (req , res , next) => {
        try {
            const userId = req.headers[HEADER.CLIENT_KEY]
            return new SuccessResponse ({
                message: "update User Success",
                metadata : await UserService.update({ userId: userId }, { ...req.body })
            }).send(res)
         }catch (e) {
            console.error(e)
        }
    };

    deleteUser = async (req , res , next) => {
        try {
            const userId = req.headers[HEADER.CLIENT_KEY]
            return new SuccessResponse ({
                message: "Delete User Success",
                metadata : await UserService.delete({userId : userId})
            }).send(res)
         }catch (e) {
            console.error(e)
        }
    };

    forgotPassword = async (req , res , next) => {
        try {
            return new SuccessResponse ({
                message: "Forgot Password Success",
                metadata : await UserService.forgotPassword(req.body.email)
            }).send(res)
         }catch (e) {
            console.error(e)
        }
    };
}

export default new UserController()