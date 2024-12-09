import { BadRequestError } from "../core/error.response";
import orderModel from "../models/order.model";
import { acquireLock, releaseLock } from "../redisClient";
import VoucherService from "./voucher.service";
import { generateVNPayUrl } from "../utils/vnpay";

class OrderService {
  static get = async (query) => {
    return await orderModel.findOne(query).lean();
  };
  static getAll = async () => {
    return await orderModel.find().lean();
  };
  static create = async (data) => {
    return await orderModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await orderModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await orderModel.findOneAndDelete(query).lean();
  };
  static orderReview = async (data) => {
    const { userId } = data.userId;
    let ownerOrderIds = data.orders;

    const checkoutOrder = {
      totalPrice: 0,
      totalVoucher: 0,
      totalOrder: 0,
    };

    const ownerOrderIdsNew = [];

    for (let i = 0; i < ownerOrderIds.length; i++) {
      const {
        ownerId,
        ownerDiscounts = [],
        orderItems = [],
      } = ownerOrderIds[i];

      // check cac phan tu trong order deu ok 0

      const orderPrice = orderItems.reduce((acc, item) => {
        return acc + item.quantity * item.price;
      }, 0);

      //tong tien trc khi xu ly
      checkoutOrder.totalPrice += orderPrice;

      const itemOrder = {
        ownerId,
        ownerDiscounts,
        priceRaw: orderPrice,
        priceApplyVoucher: orderPrice,
        orderItems: orderItems,
      };

      if (ownerDiscounts.length > 0) {
        for (let j = 0 ; j < ownerOrderIds[i].codes.length ; j++){
          const { totalPrice = 0, voucher = 0 } =
            await VoucherService.getVoucherAmount({
              code: ownerOrderIds[i].codes[j],
              userId: ownerId,
              products: orderItems,
            });
  
          console.log("Voucher", voucher)
  
          if (voucher > 0) {
            itemOrder.priceApplyVoucher = orderPrice - voucher;
            checkoutOrder.totalVoucher += voucher
          }
        }
      }

      checkoutOrder.totalOrder += itemOrder.priceApplyVoucher;

      ownerOrderIdsNew.push(itemOrder);
    }


    return {
      ownerOrderIds,
      ownerOrderIdsNew,
      checkoutOrder,
    };
  };

  static orderByUser = async (data) => {
   

    // const newOrder = await OrderService.create({
    //   userId: data.userId,
    //   priceOriginal: checkoutOrder.totalPrice,
    //   priceFinal: checkoutOrder.totalOrder,
    // });

    // return newOrder;

    const { amount, orderInfo, returnUrl, ipAddr, bankCode} = data;

    //  const { ownerOrderIdsNew, checkoutOrder } = await OrderService.orderReview(data);
    // const orderItems = ownerOrderIdsNew.flatMap((order) => order.orderItems);
    // console.log("OrderItems: ", orderItems);
    // const acquireOrderItems = [];
    // for (let i = 0; i < orderItems.length; i++) {
    //   const { accommodationId, quantity } = orderItems[i];
    //   const keyLock = await acquireLock(accommodationId, quantity);
    //   acquireOrderItems.push(keyLock ? true : false);
    //   if (keyLock) {
    //     await releaseLock(keyLock);
    //   }
    // }

    // if (acquireOrderItems.includes(false)) {
    //   throw new BadRequestError("Loi don dat hang bi loi !!!");
    // }

    console.log("Bank code" ,  bankCode)

    const tmnCode = process.env.VNPAY_TMN_CODE || '';
    const secretKey = process.env.VNPAY_SECRET_KEY || '';
    const vnpUrl = process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

    if (!amount || !orderInfo || !returnUrl || !ipAddr) {
      throw new BadRequestError("Error VnPayment");
    }

    try {
      const paymentUrl = generateVNPayUrl(amount, orderInfo, returnUrl, ipAddr, tmnCode, secretKey, vnpUrl, bankCode);
      // res.status(200).json({ paymentUrl });
      return {
        paymentUrl
      }
    } catch (error: any) {
      throw new BadRequestError("Error VnPayment");
    }
  };
}

export default OrderService;
