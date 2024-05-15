import mongoose from "mongoose";
import nanoid from '../libraries/mongoose-nanoid';

export interface IUser extends mongoose.Document {
    userId: string;
    // referrerId: string;
    email: string;
    password: string;
    name: string;
    authGoogleId: string;
    authFacebookId: string;
    // authType: string;
    phoneNumber: string;
    // usdtBalance: number;
    // breathsBalance: number;
    // directCom: number;
    // indirectCom: number;
    // directVolumn: number;
    status: number;
    userRole: string;
    isInvest: boolean;
    verifiedEmail: boolean;
    verifiedGoogleAuthen: boolean;
    avatar: string;
    googleAuthen: boolean;
    // nodePos: TreeNode;
    // nodePosTemp: TreeNode;
    // comparePassword(candidatePassword: string): Promise<boolean>;
    // isActiveWhitePack: boolean;
    // isActiveBlackPack: boolean;
    // isActiveLitePack: boolean;
    // isActiveBronzePack: boolean;
    // isAutoRenewLitePack: boolean;
    // isAutoRenewBronzePack: boolean;
    // isFreeTrialLite: boolean;
    // isMerchant: boolean;
    // expireLite: number;
    // expireBronze: number;
    // balanceStatus: string;
    active_at: string
    verified_at: string;
    created_at: string;
    updated_at: string;
}


const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const userSchema = new Schema<IUser>(
    {
      userId: {
        type: String,
        required: true,
        index: { unique: true },
      },
    //   referrerId: {
    //     type: String,
    //     // required: true,
    //   },
      email: {
        type: String,
        unique: true,
        // lowercase: true,
      },
    //   isInvest: {
    //     type: Boolean,
    //     default: false,
    //   },
      verifiedEmail: {
        type: Boolean,
        default: false,
      },
      verifiedGoogleAuthen: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
      },
      password: {
        type: String,
      },
      avatar: {
        type: String,
      },
      authGoogleId: {
        type: String,
        default: '',
      },
      authFacebookId: {
        type: String,
        default: '',
      },
      phoneNumber: {
        type: String,
      },
    //   authType: {
    //     type: String,
    //     enum: ['local', 'google', 'facebook'],
    //     default: 'local',
    //   },
    //   usdtBalance: {
    //     type: Number,
    //     default: 0,
    //   },
    //   breathsBalance: {
    //     type: Number,
    //     default: 0,
    //   },
    //   directCom: {
    //     type: Number,
    //     default: 0,
    //   },
    //   indirectCom: {
    //     type: Number,
    //     default: 0,
    //   },
    //   nodePos: {
    //     x: {
    //       type: Number,
    //     },
    //     y: {
    //       type: Number,
    //     },
    //   },
    //   nodePosTemp: {
    //     x: {
    //       type: Number,
    //     },
    //     y: {
    //       type: Number,
    //     },
    //   },
    //   isActiveWhitePack: {
    //     type: Boolean,
    //     default: true,
    //   },
    //   isActiveBlackPack: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   isActiveLitePack: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   isActiveBronzePack: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   isAutoRenewLitePack: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   isAutoRenewBronzePack: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   isFreeTrialLite: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   isMerchant: {
    //     type: Boolean,
    //     default: false,
    //   },
      userRole: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        // require: true,
      },
      status: {
        type: Number,
        // require: true,
        default: 1,
      },
    //   expireLite: {
    //     type: Number,
    //   },
    //   expireBronze: {
    //     type: Number,
    //   },
    //   balanceStatus: {
    //     type: String,
    //   },
      active_at: {
        type: String,
        default : ""
      },
      verified_at: {
        type: String,
        default : ""
      },
    },
    {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
      collection: 'User',
    }
  );


  userSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'userId',
  });

//Export the model
// module.exports = mongoose.model('User', userSchema);

export default mongoose.model<IUser>('User', userSchema);