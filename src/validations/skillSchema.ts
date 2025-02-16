import z from "zod";
export const addSkillSchema = z.object({
    title: z
        .string()
        .min(3, { message: "The minimum number of characters required is 3" }),
});

