import AccommoService from "../services/accommodation.service"
import AccommodationTypeService from "../services/accommodationType.service"
import { SuccessResponse , CREATED } from "../core/success.response"

class AccommodationController {
    createAccommodation  = async (req , res , next) => {
        return new CREATED({
            message: "Create Accommodation Ok",
            metadata : await AccommoService.createAccommodation(req.body.accommodationType ,req.body)
        }).send(res)
    };

    getAccommodation  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get Accommodation Ok",
            metadata : await AccommoService.getAccommodation({accommodationId : req.query.accommodationId})
        }).send(res)
    };

    getallAccommodation  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get All Accommodation Ok",
            metadata : await AccommoService.getAllAccommodation()
        }).send(res)
    };

    updateAccommodation  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update Accommodation Ok",
            metadata : await AccommoService.updateAccommodation({accommodationId : req.body.accommodationId} , {...req.body})
        }).send(res)
    };

    deleteAccommodation  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete Accommodation Ok",
            metadata :  await AccommoService.deleteAccommodation({accommodationId : req.body.accommodationId})
        }).send(res)
    };

    createAccommodationType  = async (req , res , next) => {
        return new CREATED({
            message: "Create AccommodationType Ok",
            metadata : await AccommodationTypeService.create(req.body)
        }).send(res)
    };

    deleteAccommodationType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Delete AccommodationType Ok",
            metadata : await AccommodationTypeService.delete({accommodationTypeId : req.body.accommodationTypeId})
        }).send(res)
    };

    getAcommodationType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get AccommodationType Ok",
            metadata : await AccommodationTypeService.get({accommodationTypeId : req.query.accommodationTypeId})
        }).send(res)
    };

    getallAcommodationType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Get all AccommodationType Ok",
            metadata : await AccommodationTypeService.getAll()
        }).send(res)
    };

    updateAcommodationType  = async (req , res , next) => {
        return new SuccessResponse({
            message: "Update AccommodationType Ok",
            metadata : await AccommodationTypeService.update({accommodationTypeId : req.body.accommodationTypeId} , {name : req.body.name})
        }).send(res)
    };
}

export default new AccommodationController()