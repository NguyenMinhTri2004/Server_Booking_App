// import AccommoService from "../services/convenient.service"
import ServiceTypeService from "../services/service.serviceType";
import ServiceService from "../services/service.service";
import { SuccessResponse , CREATED } from "../core/success.response"

class ServiceController {
    createService  = async (req , res , next) => {
        return new CREATED({
            message: "Create Service Ok",
            metadata : await ServiceService.create(req.body)
        }).send(res)
    };

    getService  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Service Ok",
            metadata : await ServiceService.get({serviceId : req.query.serviceId})
        }).send(res)
    };

    getallService  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get All Service Ok",
            metadata : await ServiceService.getAll()
        }).send(res)
    };

    updateService  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update Service Ok",
            metadata : await ServiceService.update({serviceId : req.body.serviceId} , {...req.body})
        }).send(res)
    };

    deleteService  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete Service Ok",
            metadata :  await ServiceService.delete({serviceId : req.body.serviceId})
        }).send(res)
    };

    createServiceType  = async (req , res , next) => {
        return new CREATED({
            message: "Create ServiceType Ok",
            metadata : await ServiceTypeService.create(req.body)
        }).send(res)
    };

    deleteServiceType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete ServiceType Ok",
            metadata : await ServiceTypeService.delete({serviceTypeId : req.body.serviceTypeId})
        }).send(res)
    };

    getServiceType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get ServiceType Ok",
            metadata : await ServiceTypeService.get({serviceTypeId : req.query.serviceTypeId})
        }).send(res)
    };

    getallServiceType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get all ServiceType Ok",
            metadata : await ServiceTypeService.getAll()
        }).send(res)
    };

    updateServiceType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update ServiceType Ok",
            metadata : await ServiceTypeService.update({serviceTypeId : req.body.serviceTypeId} , {...req.body})
        }).send(res)
    };
}

export default new ServiceController()