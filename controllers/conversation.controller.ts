
import ConvenrsationService from "../services/conversation.service";
import { SuccessResponse , CREATED } from "../core/success.response"

class ConvenrsationController {
    createConvenrsation  = async (req , res , next) => {
        return new CREATED({
            message: "Create Convenrsation Ok",
            metadata : await ConvenrsationService.create(req.body)
        }).send(res)
    };

    getallConvenrsationByUserId  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Convenrsation Ok",
            metadata : await ConvenrsationService.get({user : req.query.userId})
        }).send(res)
    };

    getConvenrsationById  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Convenrsation Ok",
            metadata : await ConvenrsationService.get({conversationId : req.query.conversationId}),
        }).send(res)
    };

    getallConvenrsation  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get All Convenrsation Ok",
            metadata : await ConvenrsationService.getAll()
        }).send(res)
    };

    updateConvenrsation  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update Convenrsation Ok",
            metadata : await ConvenrsationService.update({conversationId : req.body.conversationId} , {...req.body})
        }).send(res)
    };

    deleteConvenrsation  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete Convenrsation Ok",
            metadata :  await ConvenrsationService.delete({conversationId : req.body.conversationId})
        }).send(res)
    };
}

export default new ConvenrsationController()