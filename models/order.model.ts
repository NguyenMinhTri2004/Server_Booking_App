import mongoose, { Mixed, model } from "mongoose";
import nanoid from '../libraries/mongoose-nanoid';

export interface IOrder extends mongoose.Document {
    orderId: string,
    accommodation : string,
    status : string,
    priceOriginal : number,
    priceFinal : number,
    dateStart: Date,
    dateEnd: Date,
    user: string,
    // email: string,
    // firstName: string,
    // lastName: string,
    // phoneNumber: number,
    created_at: string,
    updated_at: string,
}


const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const orderSchema = new Schema<IOrder>(
    
    {
        orderId: {
            type: String,
            required: true,
            index: { unique: true },
        },
        accommodation : {
            type : String,
            required : true,
            ref : "Accommodation"
        },
        status: {
            type: String,
            required: true,
        },
        priceOriginal  : {
            type : Number,
            required : true,
        },
        priceFinal  : {
            type : Number,
            required : true,
        },
        dateStart: {
            type: Date,
            required: true,
        },
        dateEnd: {
            type: Date,
            required: true,
        },
        user: {
            type: String,
            required: true,
            ref : "User",
        },
        // email: {
        //     type: String,
        //     required: true,
        // },
        // firstName: {
        //     type: String,
        //     required: true,
        // },
        // lastName: {
        //     type: String,
        //     required: true,
        // },
        // phoneNumber: {
        //     type: String,
        //     required: true,
        // },
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
      collection: 'Orders',
    }
  );


  orderSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'orderId',
  });


//Export the model

export default mongoose.model('Order', orderSchema);