"use client";
import BackButton from "@/components/shared/Buttons/BackButton/BackButton";
import InputComponent from "@/components/shared/Form/InputComponent/InputComponent";
import UploadImage from "@/components/shared/Form/UploadImage/UploadImage";
import UploadImages from "@/components/shared/Form/UploadImages/UploadImages";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  actionNewProject,
  actionUpdateProject,
} from "@/server/actions/projects";
import { ProjectWithRelations } from "@/types/project";
import { Languages } from "@/utils/constants";
import {
  editProjectSchema,
  newProjectSchema,
  ProjectType,
} from "@/validations/ProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslations } from "use-intl";
import TextEditor from "../TextEditor/TextEditor";

const FormProject = ({
  type,
  project,
}: {
  type: "new" | "update";
  project?: ProjectWithRelations;
}) => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || Languages.ENGLISH;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectType>({
    resolver:
      type === "new"
        ? zodResolver(newProjectSchema())
        : zodResolver(editProjectSchema()),
    defaultValues: {
      order: project?.order ?? 0,
      role: project?.role ?? "",
      stack: project?.stack ?? "",
      previewLink: project?.previewLink ?? "",
      githubLink: project?.githubLink ?? "",
      image: null,
      gallery: [],
      isPublished: project?.isPublished ?? false,
      translations: project?.translations.map((t) => ({
        language: t.language || locale,
        title: t.title ?? "",
        description: t.description ?? "",
        editorContent: t.editorContent ?? "",
        tag: t.tag ?? "",
      })) ?? [
        {
          language: locale,
          title: "",
          editorContent: "",
          tag: "",
        },
      ],
    },
  });
  const t = useTranslations();

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    project?.image || null
  );
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    project?.gallery?.map((img) => img.url) || []
  );
  const [imagesData, setImagesData] = useState<
    { file: File | null; order?: number }[]
  >([]);

  const selectedImage = watch("image");
  const editorContent = watch(`translations.0.editorContent`);

  const submitForm: SubmitHandler<ProjectType> = async (data) => {
    try {
      const formData = new FormData();
      // البيانات العامة
      Object.entries(data).forEach(([key, value]) => {
        if (
          value &&
          key !== "isPublished" &&
          key !== "image" &&
          key !== "gallery" &&
          key !== "translations"
        ) {
          formData.append(key, value.toString());
        }
      });

      formData.append("isPublished", String(data.isPublished));

      // صورة رئيسية
      if (selectedImage instanceof File && selectedImage.size > 0) {
        formData.append("image", selectedImage);
      }

      // صور المعرض
      imagesData.forEach(({ file, order }) => {
        if (file instanceof File && file.size > 0) {
          formData.append("gallery", file);
          formData.append("galleryOrders[]", String(order ?? 0));
        }
      });

      // الصور القديمة
      formData.append("remainingExistingGallery", JSON.stringify(previewUrls));
      // الترجمات
      (data.translations || [])
        .filter((t) => t.title || t.editorContent || t.tag)
        .forEach((t, i) => {
          formData.append(`translations[${i}][language]`, t.language);
          formData.append(`translations[${i}][title]`, t.title ?? "");
          formData.append(`translations[${i}][description]`, t.description ?? "");
          formData.append(
            `translations[${i}][editorContent]`,
            t.editorContent ?? ""
          );
          formData.append(`translations[${i}][tag]`, t.tag ?? "");
        });

      if (type === "new") {
        const res = await actionNewProject(formData);
        if (res?.status !== 200) {
          toast.error(`Error adding Project! ${res?.message || res?.error}`);
          console.log("Error details:", res?.message);
          return;
        }
        reset();
        toast.success("Project added successfully!");
      } else if (type === "update" && project) {
        await actionUpdateProject(formData, project.id, locale);
        toast.success("Project updated successfully!");
      }

      // router.push(`/${locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}`);
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
      {/* صورة المشروع */}
      <div>
        <UploadImage<ProjectType>
          setValue={setValue}
          setPreviewUrl={setPreviewUrl}
          previewUrl={previewUrl}
          error={errors.image?.message}
        />
      </div>

      {/* بيانات المشروع */}
      <div className="flex-1">
        <div className="space-y-2">
          <InputComponent
            type="number"
            label="Order"
            name="order"
            register={register}
            placeholder="Order"
            error={errors.order?.message}
          />

          {/* حقول الترجمة الحالية */}

          <input
            type="hidden"
            value={locale}
            {...register(`translations.${0}.language`)}
          />
          <InputComponent
            label="Title"
            name={`translations.${0}.title`}
            register={register}
            placeholder="Title"
            error={errors.translations?.[0]?.title?.message}
          />

          <InputComponent
            label="Description"
            name={`translations.${0}.description`}
            register={register}
            placeholder="Description"
            type="textarea"
            error={errors.translations?.[0]?.description?.message}
          />

          <TextEditor
            editorContent={editorContent || ""}
            onChange={(editorContent) =>
              setValue(`translations.0.editorContent`, editorContent)
            }
          />
          {errors.translations?.[0]?.editorContent && (
            <p className="text-red-500 text-sm">
              {errors.translations?.[0]?.editorContent.message}
            </p>
          )}

          <InputComponent
            label="Tag"
            name={`translations.${0}.tag`}
            register={register}
            placeholder="Tag"
            error={errors.translations?.[0]?.tag?.message}
          />

          {/* باقي الحقول العامة */}
          <InputComponent
            label="Role"
            name="role"
            register={register}
            placeholder="Role"
            error={errors.role?.message}
          />
          <InputComponent
            label="Stack"
            name="stack"
            register={register}
            placeholder="Stack"
            error={errors.stack?.message}
          />
          <InputComponent
            label="Preview Link"
            name="previewLink"
            register={register}
            placeholder="Preview Link"
            error={errors.previewLink?.message}
          />
          <InputComponent
            label="Github Link"
            name="githubLink"
            register={register}
            placeholder="Github Link"
            error={errors.githubLink?.message}
          />

          {/* معرض الصور */}
          <UploadImages
            setValue={setValue}
            existingImages={project?.gallery?.map((img) => img.url) || []}
            setExistingUrls={setPreviewUrls}
            setImagesData={setImagesData}
            error={errors.gallery?.message}
          />
          <Controller
            name="isPublished"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2 !mt-5">
                <Switch
                  id="isPublished"
                  checked={!!field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
                <Label htmlFor="isPublished" className="!mx-3">
                  Published
                </Label>
              </div>
            )}
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
