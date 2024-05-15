import mongoose, { Mixed, model } from "mongoose";
import nanoid from '../libraries/mongoose-nanoid';

export interface IVoucher extends mongoose.Document {
    voucherId: string,
    description : string,
    type : string,
    value : number,
    code : string,
    startDate : Date,
    endDate : Date,
    maxUses : number,
    usesCount : number,
    usersUsed : number,
    maxUsesPerUser : number,
    minOrderValue : number,
    status : boolean,
    appliesTo : [],
    commodations : [],
    user : string,
    created_at: string,
    updated_at: string,
}


const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const voucherSchema = new Schema<IVoucher>(
    
    {
        voucherId: {
            type: String,
            required: true,
        },
        description : {
            type: String,
            required: true,
        },
        type : {
            type: String,
            required: true,
        },
        value : {
            type: Number,
            required: true,
        },
        code : {
            type: String,
            required: true,
        },
        startDate : {
            type: Date,
            required: true,
        },
        endDate : {
            type: Date,
            required: true,
        },
        maxUses : {
            type: Number,
            required: true,
        },
        usesCount : {
            type: Number,
            required: true,
        },
        usersUsed : {
            type: Number,
            required: true,
        },
        maxUsesPerUser : {
            type: Number,
            required: true,
        },
        minOrderValue : {
            type: Number,
            required: true,
        },
        status : {
            type: Boolean,
            required: true,
        },
        appliesTo : {
            type: [],
            required: false,
        },
        commodations : {
            type: [],
            required: false,
            ref : "Commodation",
        },
        user : {
            type: String,
            required: true,
            ref : "User",
        },
        created_at: {
            type: String,
            required: false,
        },
        updated_at: {
            type: String,
            required: false,
        },
      
    },
    {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
      collection: 'Vouchers',
    }
  );


  voucherSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'voucherId',
  });


//Export the model

export default mongoose.model('Voucher', voucherSchema);