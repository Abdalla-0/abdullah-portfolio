"use client";

import InputComponent from "@/components/common/Form/InputComponent/InputComponent";
import { actionLogin } from "@/server/actions/auth";
import { loginSchema, loginType } from "@/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Common");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema()),
    mode: "onSubmit",
  });

  const handleLogin: SubmitHandler<loginType> = async (data) => {
    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("locale", locale);

    try {
      await actionLogin(formData);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-bold">Dashboard Login</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-4 element-center w-full"
        >
          <div className="relative w-full md:w-1/2">
            <InputComponent
              type="password"
              name="password"
              placeholder="Enter Admin Password"
              className="rounded-full"
              register={register}
              error={errors.password?.message}
              btnPassIconClass="top-[10px] end-[138px]"
              passIconClass="w-4 h-4"
            />
            <button
              type="submit"
              className="btn-primary absolute end-0 top-0 h-[36px] w-[130px] element-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("loading") : t("login")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
