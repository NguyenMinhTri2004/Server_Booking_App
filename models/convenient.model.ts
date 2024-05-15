import mongoose, { Mixed, model } from "mongoose";
import nanoid from '../libraries/mongoose-nanoid';

export interface IConvenient extends mongoose.Document {
    convenientId: string,
    name : string,
    status : string,
    typeConvenientId : string,
    created_at: string,
    updated_at: string,
}


const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const convenientSchema = new Schema<IConvenient>(
    
    {
        convenientId: {
            type: String,
            required: true,
            index: { unique: true },
        },
        name: {
            type: String,
            required: true,
        },
        typeConvenientId : {
            type: String,
            required: true,
            ref : 'ConvenientTypes'
        },
        status: {
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
      collection: 'Convenients',
    }
  );


  convenientSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'convenientId',
  });


//Export the model

export default mongoose.model('Convenient', convenientSchema);