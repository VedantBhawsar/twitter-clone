import { Request, Response, response } from "express";
import {
  createComment,
  deleteCommentById,
  getAllComments,
  getCommentById,
  updateComment,
} from "../modals/comment";

class CommentsController {
  public getComments = async (request: Request, response: Response) => {
    try {
      const comments = await getAllComments(request.params.id);
      response.status(200).json(comments);
    } catch (error: any) {
      console.log(`[comments]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public createComment = async (request: Request, response: Response) => {
    try {
      const { author_id, message, tweet_id } = request.body;
      const comment = { author_id, tweet_id, message };
      const newComment = await createComment(comment);
      response.status(200).json(newComment);
      return;
    } catch (error: any) {
      console.log(`[comments]: ${error.message}`);
      response.status(500).json({ error: error.message });
      return;
    }
  };

  public updateComment = async (request: Request, response: Response) => {
    try {
      const existComment = await getCommentById(request.params.id);
      if (!existComment) {
        response.status(404).json({
          message: "comment not found",
        });
        return;
      }
      const updatedComment = await updateComment(
        request.params.id,
        request.body
      );
      response.status(200).json(updatedComment);
    } catch (error: any) {
      response.status(500).json({
        error: error.message,
      });
    }
  };

  public deleteComment = async (request: Request, response: Response) => {
    try {
        await deleteCommentById(request.params.id)
        response.status(204).json({
          message: "comment deleted",
        });
    } catch (error:any) {
        console.log(`[comment] ${error.message}`)
        response.status(200).json({
            error: error.message,
        })
    }
  }

}

export default new CommentsController();
