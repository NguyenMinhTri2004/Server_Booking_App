// import AccommoService from "../services/convenient.service"
import ConvenientTypeService from "../services/convenientType.service"
import ConvenientService from "../services/convenient.service";
import { SuccessResponse , CREATED } from "../core/success.response"

class ConvenientController {
    createConvenient  = async (req , res , next) => {
        return new CREATED({
            message: "Create Convenient Ok",
            metadata : await ConvenientService.create(req.body)
        }).send(res)
    };

    getConvenient  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Convenient Ok",
            metadata : await ConvenientService.get({convenientId : req.query.convenientId})
        }).send(res)
    };

    getallConvenient  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get All Convenient Ok",
            metadata : await ConvenientService.getAll()
        }).send(res)
    };

    updateConvenient  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update Convenient Ok",
            metadata : await ConvenientService.update({convenientId : req.body.convenientId} , {...req.body})
        }).send(res)
    };

    deleteConvenient  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete Convenient Ok",
            metadata :  await ConvenientService.delete({convenientId : req.body.convenientId})
        }).send(res)
    };

    createConvenientType  = async (req , res , next) => {
        return new CREATED({
            message: "Create ConvenientType Ok",
            metadata : await ConvenientTypeService.create(req.body)
        }).send(res)
    };

    deleteConvenientType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete ConvenientType Ok",
            metadata : await ConvenientTypeService.delete({convenientTypeId : req.body.convenientTypeId})
        }).send(res)
    };

    getConvenientType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get ConvenientType Ok",
            metadata : await ConvenientTypeService.get({convenientTypeId : req.query.convenientTypeId})
        }).send(res)
    };

    getallConvenientType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get all ConvenientType Ok",
            metadata : await ConvenientTypeService.getAll()
        }).send(res)
    };

    updateConvenientType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update ConvenientType Ok",
            metadata : await ConvenientTypeService.update({convenientTypeId : req.body.convenientTypeId} , {...req.body})
        }).send(res)
    };
}

export default new ConvenientController()