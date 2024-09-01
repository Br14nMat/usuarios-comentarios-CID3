import { object, string, z } from "zod";
import { Types } from "mongoose";

const reactionSchema = object({
    user: z.string({
        required_error: "User ID is required",
    }).refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid user ID",
    }),

    comment: z.string({
        required_error: "Comment ID is required",
    }).refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid comment ID",
    }),

    type: string({
        required_error: "Reaction type is required",
    }),
});

export default reactionSchema;