import { NotFoundError } from "../core/error.response";
import commentModel from "../models/comment.model";

const { accommodation } = require("../models/accommodation.model");

class CommentService {
  static get = async (query) => {
    return await commentModel.findOne(query).lean();
  };
  static getCommentsByParentId = async (query) => {
    const {
      accomodationId,
      parentCommentId = null,
      limit = 50,
      offset = 0,
    } = query;

    if (parentCommentId) {
      const parent = await commentModel.findById(parentCommentId);
      if (!parent) {
        throw new NotFoundError("Parent comment does not exist");
      }

      const comments = await commentModel
        .find({
          comment_accomodationId: accomodationId,
          comment_right: {
            $lte: parent.commentRight,
          },
          comment_left: {
            $gt: parent.commentLeft,
          },
        })
        .select({
          comment_content: 1,
          comment_right: 1,
          comment_left: 1,
          comment_parentId: 1,
        })
        .sort({
          comment_left: 1,
        });

      return comments;
    }

    const comments = await commentModel
      .find({
        comment_accomodationId: accomodationId,
        comment_parentId: parentCommentId,
      })
      .select({
        comment_content: 1,
        comment_right: 1,
        comment_left: 1,
        comment_parentId: 1,
      })
      .sort({
        comment_left: 1,
      });

    return comments;
  };
  static getAll = async () => {
    return await commentModel.find().lean();
  };
  static create = async (data) => {
    const { accomodationId, userId, content, parentCommentId = null } = data;
    const comment = new commentModel({
      comment_accomodationId: accomodationId,
      comment_userId: userId,
      comment_content: content,
      comment_parentId: parentCommentId,
    });

    let rightValue;

    if (parentCommentId) {
      //reply comment
      const parentComment = await commentModel.findById(parentCommentId);
      if (!parentComment) {
        throw new NotFoundError("Parent comment does not exist");
      }

      rightValue = parentComment.commentRight;

      await commentModel.updateMany(
        {
          comment_accomodationId: accomodationId,
          comment_right: {
            $gte: rightValue,
          },
        },
        {
          $inc: {
            comment_right: 2,
          },
        }
      );
    } else {
      const maxRightValue = await commentModel.findOne(
        {
          comment_accomodationId: accomodationId,
        },
        "comment_right",
        { sort: { comment_right: -1 } }
      );

      if (maxRightValue) {
        rightValue = maxRightValue.commentRight + 1;
      } else {
        rightValue = 1;
      }
    }

    comment.commentRight = rightValue + 1;
    comment.commentLeft = rightValue;

    await comment.save();

    return comment;
  };
  static update = async (query, queryUpdate) => {
    return await commentModel.findOneAndUpdate(query, queryUpdate, {
      returnDocument: "after",
      lean: true,
    });
  };

  static deleteComments = async (data) => {
    const { commentId, accomodationId } = data;
    const foundAccommodation = await accommodation.findOne({
      accomodationId: accomodationId,
    });

    if (!foundAccommodation) {
      throw new NotFoundError("Accommodation does not exist");
    }
    // xac dinh gia tri left va right cua comment
    const foundComment = await commentModel.findOne({
      commentId: commentId,
    });

    if (!foundComment) {
      throw new NotFoundError("Comment does not exist");
    }

    const leftValue = foundComment.commentLeft;

    const rightValue = foundComment.commentRight;

    // tinh width

    const width = rightValue - leftValue + 1;

    // xoa tat ca cac commentId con

    await commentModel.deleteMany({
      comment_accomodationId: accomodationId,
      comment_left: {
        $gte: leftValue,
        $lte: rightValue,
      },
    });

    // cap nhat gia tri left va right con lai

    await commentModel.updateMany(
      {
        comment_accomodationId: accomodationId,
        comment_right: {
          $gt: rightValue,
        },
      },
      {
        $inc: {
          comment_right: -width,
        },
      }
    );

    await commentModel.updateMany(
      {
        comment_accomodationId: accomodationId,
        comment_left: {
          $gt: rightValue,
        },
      },
      {
        $inc: {
          comment_left: -width,
        },
      }
    );

    return true;
  };
}

export default CommentService;
