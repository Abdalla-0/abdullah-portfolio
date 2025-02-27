"use client";
import BackButton from "@/components/common/BackButton/BackButton";
import InputComponent from "@/components/common/Form/InputComponent/InputComponent";
import UploadImage from "@/components/common/Form/UploadImage/UploadImage";
import { Button } from "@/components/ui/button";
import { actionNewSkill, actionUpdateSkill } from "@/server/actions/skills";
import { Languages, Routes } from "@/utils/constants";
import {
  editSkillSchema,
  newSkillSchema,
  SkillType,
} from "@/validations/skillSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skill } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslations } from "use-intl";

const FormSkill = ({ type, skill }: { type: string; skill?: Skill }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SkillType>({
    resolver:
      type === "new"
        ? zodResolver(newSkillSchema())
        : zodResolver(editSkillSchema()),
    defaultValues: {
      title: skill?.title ?? "",
      image: null,
    },
  });
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || Languages.ENGLISH;
  const t = useTranslations();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    skill?.image || null
  );

  const selectedImage = watch("image");

  const submitForm: SubmitHandler<SkillType> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value && key !== "image") {
        formData.append(key, value.toString());
      }
    });

    if (selectedImage instanceof File && selectedImage.size > 0) {
      formData.append("image", selectedImage);
    }

    try {
      if (type === "new") {
        await actionNewSkill(formData);
        reset();
        toast.success("Skill added successfully!");
        router.push(`/${locale}/${Routes.DASHBOARD}/${Routes.SKILLS}`);
      } else if (type === "update" && skill) {
        await actionUpdateSkill(formData, skill.id, locale);
        toast.success("Skill updated successfully!");
        router.push(`/${locale}/${Routes.DASHBOARD}/${Routes.SKILLS}`);
      }
    } catch (error) {
      toast.error(
        `Error ${type === "new" ? "adding" : "updating"} skill! ${error}`
      );
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row gap-10"
      onSubmit={handleSubmit(submitForm)}
    >
      <div>
        <UploadImage
          setValue={setValue}
          setPreviewUrl={setPreviewUrl}
          previewUrl={previewUrl}
          error={errors.image?.message}
        />
      </div>
      <div className="flex-1">
        <div className="space-y-2">
          <InputComponent
            label="Title"
            name="title"
            register={register}
            placeholder="Title"
            error={errors.title?.message}
          />
        </div>

        <div className="grid mt-10 space-y-3">
          <Button
            type="submit"
            className="bg-primary hover:bg-primaryShade10 px-3 py-2 rounded-md text-text"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-text"></span>
                {t("Common.loading")}
              </span>
            ) : type === "new" ? (
              "Add Skill"
            ) : (
              "Update Skill"
            )}
          </Button>
          <BackButton title="Cancel" />
        </div>
      </div>
    </form>
  );
};

export default FormSkill;
