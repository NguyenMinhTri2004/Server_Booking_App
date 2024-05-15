import mongoose, { Mixed, model } from "mongoose";
import nanoid from '../libraries/mongoose-nanoid';

export interface IdetailOrder extends mongoose.Document {
    order: string,
    detailOrderId: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    created_at: string,
    updated_at: string,
}


const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const detailOrderSchema = new Schema<IdetailOrder>(
    
    {
        order : {
            type: String,
            required: true,
            ref : "Order"
        },
        detailOrderId : {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
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
      collection: 'detailOrders',
    }
  );


  detailOrderSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'detailOrderId',
  });


//Export the model

export default mongoose.model('detailOrder', detailOrderSchema);