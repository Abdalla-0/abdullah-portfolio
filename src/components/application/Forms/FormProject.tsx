"use client";
import BackButton from "@/components/common/BackButton/BackButton";
import InputComponent from "@/components/common/Form/InputComponent/InputComponent";
import UploadImage from "@/components/common/Form/UploadImage/UploadImage";
import { Button } from "@/components/ui/button";
import {
  actionNewProject,
  actionUpdateProject,
} from "@/server/actions/projects";
import { Languages, Routes } from "@/utils/constants";
import {
  editProjectSchema,
  newProjectSchema,
  ProjectType,
} from "@/validations/ProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslations } from "use-intl";

const FormProject = ({
  type,
  project,
}: {
  type: string;
  project?: Project;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectType>({
    resolver:
      type === "new"
        ? zodResolver(newProjectSchema())
        : zodResolver(editProjectSchema()),
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      stack: project?.stack ?? "",
      link: project?.link ?? "",
      image: null,
    },
  });
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || Languages.ENGLISH;
  const t = useTranslations();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    project?.image || null
  );

  const selectedImage = watch("image");

  const submitForm: SubmitHandler<ProjectType> = async (data) => {
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
        await actionNewProject(formData);
        reset();
        toast.success("Project added successfully!");
        router.push(`/${locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}`);
      } else if (type === "update" && project) {
        await actionUpdateProject(formData, project.id, locale);
        toast.success("Project updated successfully!");
        router.push(`/${locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}`);
      }
    } catch (error) {
      toast.error(
        `Error ${type === "new" ? "adding" : "updating"} Project! ${error}`
      );
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row gap-10"
      onSubmit={handleSubmit(submitForm)}
    >
      <div>
        <UploadImage<ProjectType>
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
          <InputComponent
            label="Description"
            name="description"
            register={register}
            placeholder="Description"
            error={errors.description?.message}
          />
          <InputComponent
            label="Stack"
            name="stack"
            register={register}
            placeholder="Stack"
            error={errors.stack?.message}
          />
          <InputComponent
            label="Link"
            name="link"
            register={register}
            placeholder="Link"
            error={errors.link?.message}
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
              "Add Project"
            ) : (
              "Update Project"
            )}
          </Button>
          <BackButton title="Cancel" />
        </div>
      </div>
    </form>
  );
};

export default FormProject;
