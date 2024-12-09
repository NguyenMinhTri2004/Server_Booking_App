import crypto from 'crypto';
import querystring from 'qs';
import moment from 'moment';
const sortObject = (obj : object) => {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

export const generateVNPayUrl = (
  amount: number,
  orderInfo: string,
  returnUrl: string,
  ipAddr: string,
  tmnCode: string,
  secretKey: string,
  vnpUrl: string,
  bankCode : string
) => {
  // const date = new Date();
  // const createDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;

  // const orderId = `${date.getTime()}`; // Unique order ID
  // const locale = 'vn'; // Language
  // const currency = 'VND'; // Currency

  // // Create VNPay parameters
  // const vnpParams: Record<string, string | number> = {
  //   vnp_Version: '2.1.0',
  //   vnp_Command: 'pay',
  //   vnp_TmnCode: tmnCode,
  //   vnp_Locale: locale,
  //   vnp_CurrCode: currency,
  //   vnp_TxnRef: orderId,
  //   vnp_OrderInfo: orderInfo,
  //   vnp_OrderType: 'billpayment',
  //   vnp_Amount: amount * 100, // VNPay requires amount in smallest unit (VND * 100)
  //   vnp_ReturnUrl: returnUrl,
  //   vnp_IpAddr: ipAddr,
  //   vnp_CreateDate: createDate,
  // };

  // // Sort parameters
  // const sortedParams = Object.keys(vnpParams)
  //   .sort()
  //   .reduce((result, key) => {
  //     result[key] = vnpParams[key];
  //     return result;
  //   }, {} as Record<string, string | number>);

  // // Create the signature
  // const signData = querystring.stringify(sortedParams); // Removed { encode: false }
  // const hmac = crypto.createHmac('sha512', secretKey).update(Buffer.from(signData, 'utf-8')).digest('hex');

  // // Add the secure hash to the parameters
  // sortedParams['vnp_SecureHash'] = hmac;

  // // Create the payment URL
  // const paymentUrl = `${vnpUrl}?${querystring.stringify(sortedParams)}`; // Removed { encode: false }
  // return paymentUrl;

  // process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();  

    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    
    // let tmnCode = config.get('vnp_TmnCode');
    // let secretKey = config.get('vnp_HashSecret');
    // let vnpUrl = config.get('vnp_Url');
    // let returnUrl = config.get('vnp_ReturnUrl');
    // let orderId = ;
    // let amount = req.body.amount;

    const orderId = `${date.getTime()}`; // Unique order ID
     
    let locale = 'vn';
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    // let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    // let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return vnpUrl;
};