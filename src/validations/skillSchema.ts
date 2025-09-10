import z from "zod";
import { imageSchema } from "./imageSchema";
const newSkillSchema = () => {
  return z.object({
    order: z.number().min(1, { message: "Order is required" }),
    image: imageSchema(true)
  });
};
const editSkillSchema = () => {
  return z.object({
    order: z.number().min(1, { message: "Order is required" }),
    image: imageSchema(false)
  });
};

type SkillType = z.infer<ReturnType<typeof newSkillSchema>>;

export { newSkillSchema, editSkillSchema, type SkillType };
