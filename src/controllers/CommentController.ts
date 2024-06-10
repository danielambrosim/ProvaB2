import { Request, Response } from "express";
import CommentDataBaseService from "../services/CommentDataBaseService";


class CommentController {
    constructor() {}

    async listComments(req: Request, res: Response) {
      try {
        const comments = await CommentDataBaseService.listDBComments;
        res.json({
          status: "ok",
          users: comments,
        });
      } catch (error) {
        console.log(error);
        res.json({
          status: "error",
          message: error,
        });
      }
    }
  
    async createComment(req: Request, res: Response) {
      const {title, content, published, authorId} = req.body;

  
      if (!title || !published || !authorId) {
        res.json({
          status: "error",
          message: "Falta parâmetros",
        });
        return;
      }
  
      try {
        const newpost = await CommentDataBaseService.insertDBComment({
            title: title,
            content: content,
            published: published,
            author: { connect: { id: authorId } },
        });
        res.json({
          status: "ok",
          newuser: newpost,
        });
      } catch (error) {
        res.json({
          status: "error",
          message: error,
        });
      }
    }
  
    async updateComment(req: Request, res: Response) {
      const id = req.params.id;
      if (!id) {
        res.json({
          status: "error",
          message: "Faltou o ID",
        });
      }
  
      const {title, content, published, authorId} = req.body;
      if (!title || !published || !authorId) {
        res.json({
          status: "error",
          message: "Falta parâmetros",
        });
      }
  
      try {
        const updateDBComment = await CommentDataBaseService.updateDBComment(
          {
            title: title,
            content: content,
            published: published,
            author: { connect: { id: authorId } },
          },
          id
        );
        res.json({
          status: "ok",
          newuser: updateDBComment,
        });
      } catch (error) {
        res.json({
          status: "error",
          message: error,
        });
      }
    }

    async deleteComment(req: Request, res: Response) {
      const id = req.params.id;
      if (!id) {
        res.json({
          status: "error",
          message: "Faltou o ID",
        });
      }
  
      try {
        const response = await CommentDataBaseService.deleteDBComment(id);
        if (response) {
          res.json({
            status: "ok",
            message: "Comment deletado com sucesso",
          });
        }
      } catch (error) {
        console.log(error);
        res.json({
          status: "error",
          message: error,
        });
      }
    }
}

export default new CommentController();