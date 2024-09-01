import { NotAuthorizedError, ReactionExistsError } from "../exceptions";
import { ReactionDocument, ReactionInput } from "../models/reaction.model";
import ReactionModel from "../models/reaction.model";
import UserService from "./user.service";
import CommentService from "./comment.service";

class ReactionService {
    public async create(reactionInput: ReactionInput): Promise<ReactionDocument> {
        try {
            // Validar existencia del usuario
            const userExists = await UserService.findById(reactionInput.user.toString());
            if (!userExists) throw new NotAuthorizedError("User does not exist");

            // Validar existencia del comentario
            const commentExists = await CommentService.findById(reactionInput.comment.toString());
            if (!commentExists) throw new NotAuthorizedError("Comment does not exist");

            // Verificar si la reacción ya existe para evitar duplicados
            const existingReaction = await ReactionModel.findOne({
                user: reactionInput.user,
                comment: reactionInput.comment
            });
            if (existingReaction) throw new ReactionExistsError("Reaction already exists");

            // Crear la reacción
            const reaction = await ReactionModel.create(reactionInput);

            return reaction;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<ReactionDocument[]> {
        try {
            const reactions = await ReactionModel.find();
            return reactions;
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<ReactionDocument | null> {
        try {
            const reaction: ReactionDocument | null = await ReactionModel.findById(id);
            return reaction;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, reactionInput: Partial<ReactionInput>): Promise<ReactionDocument | null> {
        try {
            const reaction: ReactionDocument | null = await ReactionModel.findByIdAndUpdate(id, reactionInput, { returnOriginal: false });
            return reaction;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<ReactionDocument | null> {
        try {
            const reaction: ReactionDocument | null = await ReactionModel.findByIdAndDelete(id);
            return reaction;
        } catch (error) {
            throw error;
        }
    }
}

export default new ReactionService();
