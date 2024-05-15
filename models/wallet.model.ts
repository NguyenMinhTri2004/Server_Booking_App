import mongoose, { Mixed, model } from "mongoose";
import nanoid from '../libraries/mongoose-nanoid';

export interface IWallet extends mongoose.Document {
    walletId: string,
    value: number,
    user : string,
    created_at: string,
    updated_at: string,
}


const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const walletSchema = new Schema<IWallet>(
    
    {
        walletId: {
            type: String,
            required: true,
        },
        value : {
            type: Number,
            required: true,
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
      collection: 'Wallets',
    }
  );


  walletSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'walletId',
  });


//Export the model

export default mongoose.model('Wallet', walletSchema);