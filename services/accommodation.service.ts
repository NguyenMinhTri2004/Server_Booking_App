import { IAccommodation} from "../models/accommodation.model";
import { BadRequestError } from "../core/error.response";
const {accommodation , apartment , hotel , resort} = require("../models/accommodation.model");


class AccommodationFactory {
    static async createAccommodation(type , payload) {
        try {
            switch (type) {
                case 'apartment':
                    return new Apartment(payload).createApartment();
                case 'hotel':
                    return new Hotel(payload).createHotel();
                case'resort':
                    return new Resort(payload).createResort();
                default:
                    throw new BadRequestError("Not create");
            }
        } catch (error) {
            throw new BadRequestError(error);
        }
    }

    static async getAccommodation(query) {
        return await accommodation.findOne(query).lean()
    }

    static async getAllAccommodation() {
        return await accommodation.find().lean()
    }

    static deleteAccommodation = async (query) => {
        return await accommodation.findOneAndDelete(query).lean()
    };

    static updateAccommodation = async (query , queryUpdate) => {
        return await accommodation.findOneAndUpdate(query, queryUpdate , { returnDocument: 'after', lean: true })
    };
};


class Accommodation{
    accommodationId: string;
    attributes: object;
    user: string;
    name: string;
    rate : number
    images : [];
    status: number;
    region: string;
    streetName: string;
    city: string;
    slug : string;
    maxGuest : number;
    isWelcomeChild : boolean;
    acreage : number;
    rooms : object;
    convenients : object;
    services : object;
    languagesUsed : [];
    generalRules : object;
    details : object;
    pricePerDay : number;
    pricePerWeek : number;
    pricePerMonth : number;
    active_at: string;
    created_at: string;
    updated_at: string;
    constructor({
        accommodationId,
        attributes,
        user,
        name,
        rate,
        images,
        status,
        region,
        streetName,
        city,
        slug,
        maxGuest,
        isWelcomeChild,
        acreage,
        rooms,
        convenients,
        services,
        languagesUsed,
        generalRules,
        details,
        pricePerDay,
        pricePerWeek,
        pricePerMonth,
        active_at,
        created_at,
        updated_at,
    }){
        this.accommodationId = accommodationId;
        this.attributes = attributes;
        this.user = user;
        this.name = name;
        this.rate = rate;
        this.images = images;
        this.status = status;
        this.region = region;
        this.streetName = streetName;
        this.city = city;
        this.slug = slug;
        this.maxGuest = maxGuest;
        this.isWelcomeChild = isWelcomeChild;
        this.acreage = acreage;
        this.rooms = rooms;
        this.convenients = convenients;
        this.services = services;
        this.languagesUsed = languagesUsed;
        this.generalRules = generalRules;
        this.details = details;
        this.pricePerDay = pricePerDay;
        this.pricePerWeek = pricePerWeek;
        this.pricePerMonth = pricePerMonth;
        this.active_at = active_at;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    async createAccommodation(){
        return await accommodation.create(this)
    }
        
}

class Apartment extends Accommodation {
    async createApartment(){
        const newApartment = await apartment.create(this.attributes)
        if(!newApartment){
            throw new BadRequestError('Error creating apartment')
        }

        const newAccommodation = await super.createAccommodation()
        if(!newAccommodation ){
            throw new BadRequestError('Error creating Accommodation')
        }

        return newApartment
    }
}

class Hotel extends Accommodation {
    async createHotel(){
        const newHotel = await hotel.create(this.attributes)
        if(!newHotel){
            throw new BadRequestError('Error creating Hotel')
        }

        const newAccommodation = await super.createAccommodation()
        if(!newAccommodation ){
            throw new BadRequestError('Error creating Accommodation')
        }

        return newHotel
    }
}

class Resort extends Accommodation {
    async createResort(){
        const newResort = await resort.create(this.attributes)
        if(!newResort){
            throw new BadRequestError('Error creating resort')
        }

        const newAccommodation = await super.createAccommodation()
        if(!newAccommodation ){
            throw new BadRequestError('Error creating Accommodation')
        }

        return newResort
    }
}

export default AccommodationFactory;