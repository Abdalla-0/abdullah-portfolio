"use server";
import { Routes } from "@/utils/constants";
import { loginSchema } from "@/validations/loginSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function actionLogin(formData: FormData) {
    const parsedData = loginSchema().safeParse({
        password: formData.get("password"),
        locale: formData.get("locale"),
    });

    try {
        if (!parsedData.success) {
            return { error: parsedData.error.format().password?._errors[0] };
        }

        if (parsedData.data.password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            return { error: "Invalid password" };
        }


        (await cookies()).set("admin-token", "secret-token", {
            path: `${Routes.ROOT}`,
            maxAge: 86400,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        redirect(`/${parsedData.data.locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}`);
    } catch (error) {
        console.error("Login error:", error);
        return { error: "An unexpected error occurred. Please try again." };
    }
}



export async function actionLogout() {
    (await cookies()).delete("admin-token");
}