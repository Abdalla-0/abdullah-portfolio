import z from "zod";
const loginSchema = () => {
    return z.object({
        password: z.string().min(1, { message: "Password is required" }).refine((val) =>
            val === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
            , { message: "Invalid password" }),
        locale: z.string().min(2).or(z.undefined())
    });

}

type loginType = z.infer<ReturnType<typeof loginSchema>>;

export { loginSchema, type loginType };