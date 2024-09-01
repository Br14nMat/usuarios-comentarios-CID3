import { object, string, z } from "zod";
import { Types } from "mongoose";

const commentSchema = object({
    author: z.string({
        required_error: "Author is required",
    }).refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid author ID",
    }),

    content: string({
        required_error: "Content is required",
    }).min(1, "Content cannot be empty"),

    parentComment: z.string().optional().refine((val) => !val || Types.ObjectId.isValid(val), {
        message: "Invalid parent comment ID",
    }),
});

export default commentSchema;
