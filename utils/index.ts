
const _ = require('lodash');

export const getInfoData = ({fields = [], object = {}}) => {
    return _.pick(object, fields)
}

export const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    const timestamp = Date.now();
    return { otp: OTP, timestamp: timestamp };
  };
  