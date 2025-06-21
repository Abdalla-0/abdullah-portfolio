import z from "zod";
import { imageSchema } from "./imageSchema";
const newProjectSchema = () => {
    return z.object({
        title: z.string().trim().min(1, { message: "Title is required" }),
        role: z.string().trim().min(1, { message: "Role is required" }),
        description: z.string().trim().min(1, { message: "Description is required" }),
        stack: z.string().trim().min(1, { message: "Satck is required" }),
        previewLink: z.string().trim().optional(),
        githubLink: z.string().trim().optional(),
        image: imageSchema(true),
        gallery: z
            .array(imageSchema(true))
            .optional(),
    });
};
const editProjectSchema = () => {
    return z.object({
        title: z.string().trim().min(1, { message: "Title is required" }),
        role: z.string().trim().min(1, { message: "Role is required" }),
        description: z.string().trim().min(1, { message: "Description is required" }),
        stack: z.string().trim().min(1, { message: "Satck is required" }),
        previewLink: z.string().trim().optional(),
        githubLink: z.string().trim().optional(),
        image: imageSchema(false),
        gallery: z
            .array(imageSchema(true))
            .optional(),
    });
};

type ProjectType = z.infer<ReturnType<typeof newProjectSchema>>;

export { newProjectSchema, editProjectSchema, type ProjectType };