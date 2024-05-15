
import MessageService from "../services/message.service";
import { SuccessResponse , CREATED } from "../core/success.response"

class CommentController {
    createMessage  = async (req , res , next) => {
        return new CREATED({
            message: "Create Messsage Ok",
            metadata : await MessageService.create(req.body)
        }).send(res)
    };

    getallMessageByUserId  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Message Ok",
            metadata : await MessageService.get({user : req.query.userId})
        }).send(res)
    };

    getMessagetById  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Message Ok",
            metadata : await MessageService.get({messageId : req.query.messageId}),
        }).send(res)
    };

    getallMessage  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get All Message Ok",
            metadata : await MessageService.getAll()
        }).send(res)
    };

    updateMessage  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update Message Ok",
            metadata : await MessageService.update({messageId : req.body.messageId} , {...req.body})
        }).send(res)
    };

    deleteMessage  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete Message Ok",
            metadata :  await MessageService.delete({messageId : req.body.messageId})
        }).send(res)
    };
}

export default new CommentController()