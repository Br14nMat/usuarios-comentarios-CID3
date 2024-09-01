import mongoose, { Schema, Document } from "mongoose";

export interface ReactionInput {
    user: mongoose.Types.ObjectId;  // Referencia al ID del usuario que reaccionó
    comment: mongoose.Types.ObjectId;  // Referencia al ID del comentario al que se reaccionó
    type: string;  // Tipo de reacción (e.g., "me gusta", "amor", "en desacuerdo")
}

export interface ReactionDocument extends ReactionInput, Document {
    createdAt: Date;
}

const reactionSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
    type: { type: String, required: true },
}, { timestamps: true, collection: "reactions" });

const Reaction = mongoose.model<ReactionDocument>("Reaction", reactionSchema);

export default Reaction;
