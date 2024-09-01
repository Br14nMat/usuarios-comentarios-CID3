import { Request, Response } from "express";
import { ReactionDocument, ReactionInput } from "../models/reaction.model";
import reactionService from "../services/reaction.service";
import { NotAuthorizedError, ReactionExistsError } from "../exceptions/";

class ReactionController {

    public async create(req: Request, res: Response) {
        try {
            const reaction: ReactionDocument = await reactionService.create(req.body as ReactionInput);
            res.status(201).json(reaction);
        } catch (error) {
            if (error instanceof NotAuthorizedError) {
                res.status(400).json({ message: "User or comment does not exist" });
            } else if (error instanceof ReactionExistsError) {
                res.status(400).json({ message: "Reaction already exists" });
            } else {
                res.status(500).json(error);
            }
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const reactions: ReactionDocument[] = await reactionService.findAll();
            res.status(200).json(reactions);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getReaction(req: Request, res: Response) {
        try {
            const reaction: ReactionDocument | null = await reactionService.findById(req.params.id);
            if (!reaction) {
                res.status(404).json({ error: "Not found", message: "Reaction not found" });
                return;
            }
            res.status(200).json(reaction);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const reaction: ReactionDocument | null = await reactionService.update(req.params.id, req.body as Partial<ReactionInput>);
            if (!reaction) {
                res.status(404).json({ error: "Not found", message: "Reaction not found" });
                return;
            }
            res.status(200).json(reaction);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const reaction: ReactionDocument | null = await reactionService.delete(req.params.id);
            if (!reaction) {
                res.status(404).json({ error: "Not found", message: "Reaction not found" });
                return;
            }
            res.status(200).json(reaction);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new ReactionController();