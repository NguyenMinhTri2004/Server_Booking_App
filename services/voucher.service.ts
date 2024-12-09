import { BadRequestError, NotFoundError } from "../core/error.response";
import voucherModel from "../models/voucher.model";

class VoucherService {
  static get = async (query) => {
    return await voucherModel.findOne(query).lean();
  };

  static getAllVoucherCodesAccommodation = async (query) => {
    const { code, userId, limit, page } = query;

    const foundVoucher = await voucherModel
      .findOne({
        code: code,
        userId: userId,
      })
      .lean();

    if (!foundVoucher || !foundVoucher.active) {
      throw new NotFoundError("Voucher not exist");
    }

    const { appliesTo, accommodationIds } = foundVoucher;

    let commodations;

    // user, published

    if (foundVoucher.appliesTo === "all") {
      commodations = voucherModel.find(query);
    }

    // _id : $in : commodationIds, published

    if (foundVoucher.appliesTo === "specific") {
      commodations = voucherModel.find(query);
    }

    return await voucherModel.findOne(query).lean();
  };

  static getAllVoucherCodesByOwner = async (query) => {
    // get Unselected voucher code
    // return await voucherModel.findOne(query).lean()
  };

  static getVoucherAmount = async (data) => {
    const { code, userId, products } = data;

    const foundVoucher = await voucherModel
      .findOne({
        code: code,
        userId: userId,
      })
      .lean();

    if (!foundVoucher) {
      throw new NotFoundError("Voucher not exist");
    }

    const { active, maxUses, minOrderValue, maxUsesPerUser, value, type } = foundVoucher;

    if (!active) {
      throw new BadRequestError("Voucher already expired");
    }

    if (!maxUses) {
      throw new BadRequestError("Voucher already out");
    }

    if (
      new Date() < new Date(foundVoucher.startDate) ||
      new Date() > new Date(foundVoucher.endDate)
    ) {
      throw new BadRequestError("startDate must be before endDate");
    }

    let totalOrder = 0;

    if (minOrderValue > 0) {
      totalOrder = products.reduce(
        (totalOrder, product) => totalOrder + product.quantity * product.price,
        0
      );

      if (totalOrder < minOrderValue) {
        throw new BadRequestError("Voucher require min order value");
      }
    }

    if (maxUsesPerUser > 0) {
      const userUseVoucher = foundVoucher.usersUsed.filter(
        (user:any) => user.userId === userId
      );
      if (userUseVoucher) {
      }
    }

    const amount = type === "fixed_amount" ? value : totalOrder * (value / 100);

    console.log("totalOrder", totalOrder)
    console.log("amount", amount)
    console.log("totalPrice", totalOrder - amount)

    return {
      totalOrder,
      voucher: amount,
      totalPrice: totalOrder - amount,
    };
  };

  static getAll = async () => {
    return await voucherModel.find().lean();
  };
  static create = async (data) => {
    const {
      description,
      type,
      value,
      code,
      startDate,
      endDate,
      maxUses,
      usesCount,
      usersUsed,
      maxUsesPerUser,
      minOrderValue,
      active,
      appliesTo,
      commodations,
      userId,
    } = data;

    if (new Date() < new Date(startDate) || new Date() > new Date(endDate)) {
      throw new BadRequestError("startDate must be before endDate");
    }

    const foundVoucher = await voucherModel
      .findOne({
        code: code,
        userId: userId,
      })
      .lean();

    if (foundVoucher && foundVoucher.active) {
      throw new BadRequestError("Voucher already used");
    }

    return await voucherModel.create(data);
  };
  static update = async (query, queryUpdate) => {
    return await voucherModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static delete = async (query) => {
    return await voucherModel.findOneAndDelete(query).lean();
  };

  static cancelVoucherCode = async (query) => {
    const { code, userId, products, usersUsed, type, value } = query;

    const foundVoucher = await voucherModel
      .findOne({
        code: code,
        userId: userId,
      })
      .lean();

    if (!foundVoucher) {
      throw new NotFoundError("Voucher not exist");
    }

    const result = await voucherModel.findByIdAndUpdate(
      foundVoucher.voucherId,
      {
        $pull: {
          usersUsed: userId,
        },

        $inc: {
          maxUses: 1,
          usesCount: -1,
        },
      }
    );

    return result;
  };
}

export default VoucherService;
