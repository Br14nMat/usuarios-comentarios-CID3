import { Request, Response } from "express";
import { CommentDocument, CommentInput } from "../models/comment.model";
import commentService from "../services/comment.service";
import { NotAuthorizedError } from "../exceptions/";

class CommentController {

    public async create(req: Request, res: Response) {
        try {
            const comment: CommentDocument = await commentService.create(req.body as CommentInput);
            res.status(201).json(comment);
        } catch (error) {
            if (error instanceof NotAuthorizedError) {
                res.status(400).json({ message: "User or comment does not exist" });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const comments: CommentDocument[] = await commentService.findAll();
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getComment(req: Request, res: Response) {
        try {
            const comment: CommentDocument | null = await commentService.findById(req.params.id);
            if (!comment) {
                res.status(404).json({ error: "Not found", message: "Comment not found" });
                return;
            }
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const comment: CommentDocument | null = await commentService.update(req.params.id, req.body as Partial<CommentInput>);
            if (!comment) {
                res.status(404).json({ error: "Not found", message: "Comment not found" });
                return;
            }
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const comment: CommentDocument | null = await commentService.delete(req.params.id);
            if (!comment) {
                res.status(404).json({ error: "Not found", message: "Comment not found" });
                return;
            }
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new CommentController();