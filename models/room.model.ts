import mongoose, { Mixed, model } from "mongoose";
import nanoid from '../libraries/mongoose-nanoid';

export interface IRoom extends mongoose.Document {
    roomId: string,
    name : string,
    status : string,
    typeRoomId : string,
    created_at: string,
    updated_at: string,
}


const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const roomSchema = new Schema<IRoom>(
    
    {
        roomId: {
            type: String,
            required: true,
            index: { unique: true },
        },
        name: {
            type: String,
            required: true,
        },
        typeRoomId : {
            type: String,
            required: true,
            ref : 'RoomTypes'
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
      collection: 'Rooms',
    }
  );


  roomSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'roomId',
  });


//Export the model

export default mongoose.model('Room', roomSchema);