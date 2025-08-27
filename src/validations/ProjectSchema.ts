import z from "zod";
import { imageSchema } from "./imageSchema";
// import { Languages } from "@/utils/constants";

const getCommonValidations = () => {
  return {
    order: z.number().min(1, { message: "Order is required" }),
    role: z.string().trim().min(1, { message: "Role is required" }),
    stack: z.string().trim().min(1, { message: "Satck is required" }),
    previewLink: z.string().trim().optional(),
    githubLink: z.string().trim().optional(),
    gallery: z.array(imageSchema(true)).optional(),
    isPublished: z.boolean(),
  };
};

// schema لترجمة المشروع
const projectTranslationsSchema = z.object({
  language: z.string().trim().min(1, { message: "Language is required" }),
  title: z.string().trim().min(1, { message: "Title is required" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  tag: z.string().min(1, { message: "Tag is required" }),
  editorContent: z.string().optional(),
});

const newProjectSchema = () => {
  return z.object({
    ...getCommonValidations(),
    image: imageSchema(true),
    // حقل المصفوفة للترجمات
    translations: z.array(projectTranslationsSchema),
  });
};
const editProjectSchema = () => {
  return z.object({
    ...getCommonValidations(),
    image: imageSchema(false),
    // حقل المصفوفة للترجمات
    translations: z.array(projectTranslationsSchema),
  });
};

type ProjectType = z.infer<ReturnType<typeof newProjectSchema>>;

export { newProjectSchema, editProjectSchema, type ProjectType };
