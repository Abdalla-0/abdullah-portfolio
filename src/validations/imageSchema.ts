
import z from "zod";
export const imageSchema = (isRequired: boolean) => {
    return z
        .instanceof(File, { message: "Image is required and must be a valid file" })
        .or(z.null())
        .or(z.undefined())
        .refine((val) => {
            if (!isRequired && !val) return true;
            if (!val) return false;
            const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
            return validMimeTypes.includes(val.type);
        }, { message: "Image is required and must be a valid file" });
};