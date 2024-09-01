import mongoose, { Schema, Document } from "mongoose";

export interface CommentInput {
    author: mongoose.Types.ObjectId;  // Referencia al ID del usuario que creó el comentario
    content: string;
    parentComment?: mongoose.Types.ObjectId; // Referencia al comentario padre para hilos de discusión
}

export interface CommentDocument extends CommentInput, Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

const commentSchema = new mongoose.Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment" }, // Comentario padre para hilos
}, { timestamps: true, collection: "comments" });

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;
