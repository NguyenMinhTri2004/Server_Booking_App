import CommentService from "../services/comment.service";
import { SuccessResponse, CREATED } from "../core/success.response";

class CommentController {
  createComment = async (req, res, next) => {
    return new CREATED({
      message: "Create Comment Ok",
      metadata: await CommentService.create(req.body),
    }).send(res);
  };

  getallCommentByUserId = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Comment Ok",
      metadata: await CommentService.get({ userId: req.query.userId }),
    }).send(res);
  };

  getCommentById = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get Comment Ok",
      metadata: await CommentService.get({ commentId: req.query.commentId }),
    }).send(res);
  };

  getallComment = async (req, res, next) => {
    return new SuccessResponse({
      message: "Get All Comment Ok",
      metadata: await CommentService.getAll(),
    }).send(res);
  };

  updateComment = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update Comment Ok",
      metadata: await CommentService.update(
        { commentId: req.body.commentId },
        { ...req.body }
      ),
    }).send(res);
  };

  deleteComment = async (req, res, next) => {
    return new SuccessResponse({
      message: "Delete Comment Ok",
      metadata: await CommentService.deleteComments({
        commentId: req.body.commentId,
      }),
    }).send(res);
  };
}

export default new CommentController();
