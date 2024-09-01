import { NotAuthorizedError } from "../exceptions";
import { CommentDocument, CommentInput } from "../models/comment.model";
import CommentModel from "../models/comment.model";
import UserService from "./user.service"; // Asume que el servicio de usuarios está en user.service.ts

class CommentService {
    public async create(commentInput: CommentInput): Promise<CommentDocument> {
        try {
            // Validar existencia del autor
            const userExists = await UserService.findById(commentInput.author.toString());
            if (!userExists) throw new NotAuthorizedError("User does not exist");

            // Crear el comentario
            const comment = await CommentModel.create(commentInput);

            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<CommentDocument[]> {
        try {
            const comments = await CommentModel.find();
            return comments;
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<CommentDocument | null> {
        try {
            const comment: CommentDocument | null = await CommentModel.findById(id);
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, commentInput: Partial<CommentInput>): Promise<CommentDocument | null> {
        try {
            const comment: CommentDocument | null = await CommentModel.findByIdAndUpdate(id, commentInput, { returnOriginal: false });
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<CommentDocument | null> {
        try {
            const comment: CommentDocument | null = await CommentModel.findByIdAndDelete(id);
            return comment;
        } catch (error) {
            throw error;
        }
    }
}

export default new CommentService();
