import mongoose, { Mixed, model } from "mongoose";
import nanoid from '../libraries/mongoose-nanoid';

export interface IAccommodation extends mongoose.Document {
    accommodationId: string,
    accommodationType: string,
    attributes: object,
    user: string,
    name: string,
    rate : number
    images : [],
    status: number,
    region: string,
    streetName: string,
    city: string,
    slug : string,
    maxGuest : number,
    isWelcomeChild : boolean,
    acreage : number,
    rooms : object,
    convenients : object,
    services : object,
    languagesUsed : [],
    generalRules : object,
    details : object,
    pricePerDay : number,
    pricePerWeek : number,
    pricePerMonth : number,
    active_at: string,
    created_at: string,
    updated_at: string,
}


const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const accommodationSchema = new Schema<IAccommodation>(
    {

      accommodationId: {
        type: String,
        required: true,
        index: { unique: true },
      },

      accommodationType : {
        type : String,
        required : false,
      },

      user : {
        type : String,
        required : false,
        ref : 'User'
      },

      attributes : {
        type : Object,
        required : false,
      },
  
      name: {
        type: String,
      },

      images : {
        type : [],
        default : []
      },
    
      status: {
        type: Number,
        require: false,
        default: 1,
      },

      region: {
        type: String,
        default: '',
        required: false,
      },

      streetName :{
        type: String,
        default: '',
        required: false,
      },

      city :{ 
        type: String,
        default: '',
        required: false,
      },

      maxGuest :{
        type: Number,
        default: 1,
        required: false,
      },

      slug : {
        type: String,
        default: '',
        required: false,
      },

      // numberOfBathRoom :{
      //   type: Number,
      //   default: 1,
      //   required: true,
      // },
      
      isWelcomeChild :{
        type: Boolean,
        default: true,
        required: false,
      },
      
      rate : {
          type: Number,
          default: 0,
          required: false,
      },

      acreage : {
        type: Number,
        default: 0,
        required: false,
      },
      
      rooms : {
        type: Object,
        default: {},
        required: false,
      },

      convenients : {
        type: Object,
        default: {},
        required: false,
      },

      services : {
         type: Object,
         default: {},
         required: false,
      },
      
      languagesUsed : {
        type: [],
        default: [],
        required: false,
      },
      
      generalRules : {
        type: Object,
        default: {},
        required: false,
      },
      
      details : {
        type: Object,
        default: {},
        required: false,
      },
      
      pricePerDay : {
        type: Number,
        default: 0,
        required: false,
      },
      
      pricePerWeek : {
        type: Number,
        default: 0,
        required: false,
      },

      pricePerMonth : {
        type: Number,
        default: 0,
        required: false,
      },

      active_at: {
        type: String,
        default : ""
      },
    },
    {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
      collection: 'Accommodation',
    }
  );


  accommodationSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'accommodationId',
  });

const apartmentSchema = new Schema (
   {
    isHaveCradle :{
      type: Boolean,
      default: true,
      required: false,
    },
   },
   {
    
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
      collection: 'Apartments',
    
   }
)


const hotelSchema = new Schema (
  {
    star : {
          type : Number,
          required : false,
      },

    events : {
        type : Object,
        required : false,
      },

    numOfRoomLeft : {
        type : Number,
        required : false,
      }
  },
  {
   
     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
     collection: 'Hotels',
   
  }
)

const resortSchema = new Schema (
  {
      isHaveCradle :{
        type: Boolean,
        default: true,
        required: false,
      },

      star : {
          type : Number,
          required : false,
      },

      events : {
        type : Object,
        required : false,
      }
  },
  {
   
     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
     collection: 'Resorts',
   
  }
)

//Export the model
module.exports = {
   accommodation : mongoose.model<IAccommodation>('Accommodation', accommodationSchema),
   apartment : mongoose.model('Apartments', apartmentSchema),
   hotel : mongoose.model('Hotels', hotelSchema),
   resort : mongoose.model('Resorts', resortSchema),
}

// export default mongoose.model('Accommodation', accommodationSchema);