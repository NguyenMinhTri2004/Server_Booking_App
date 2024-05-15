import mongoose, { Mixed, model } from "mongoose";
import nanoid from '../libraries/mongoose-nanoid';

export interface IPoint extends mongoose.Document {
    pointId: string,
    value : number,
    user : string,
    created_at: string,
    updated_at: string,
}


const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const pointSchema = new Schema<IPoint>(
    
    {
        pointId:  {
            type: String,
            required: true,
        },

        value : {
            type: Number,
            required: true,
        },

        user : {
            type: String,
            ref : "User",
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
      collection: 'Points',
    }
  );


  pointSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'pointId',
  });


//Export the model

export default mongoose.model('Point', pointSchema);