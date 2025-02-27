import z from "zod";
import { imageSchema } from "./imageSchema";
const newProjectSchema = () => {
    return z.object({
        title: z.string().trim().min(1, { message: "Title is required" }),
        description: z.string().trim().min(1, { message: "Description is required" }),
        stack: z.string().trim().min(1, { message: "Satck is required" }),
        link: z.string().trim().min(1, { message: "Link is required" }),
        image: imageSchema(true)
    });
};
const editProjectSchema = () => {
    return z.object({
        title: z.string().trim().min(1, { message: "Title is required" }),
        description: z.string().trim().min(1, { message: "Description is required" }),
        stack: z.string().trim().min(1, { message: "Satck is required" }),
        link: z.string().trim().min(1, { message: "Link is required" }),
        image: imageSchema(false)
    });
};

type ProjectType = z.infer<ReturnType<typeof newProjectSchema>>;

export { newProjectSchema, editProjectSchema, type ProjectType };