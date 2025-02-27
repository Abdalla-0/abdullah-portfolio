"use client";
import { ProjectType } from "@/validations/ProjectSchema";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { UseFormSetValue } from "react-hook-form";

const UploadImage = ({
  setPreviewUrl,
  previewUrl,
  setValue,
  error,
}: {
  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setValue: UseFormSetValue<ProjectType>;
  error?: string;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file instanceof File && file.size > 0) {
      setValue("image", file, { shouldValidate: true });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="group mx-auto md:mx-0 relative w-[200px] h-[200px] overflow-hidden rounded-full element-center">
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Uploaded Image"
            width={140}
            height={140}
            objectFit="contain"
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gray-50/20 hover:bg-gray-200/10 element-center">
          <input
            id="image-upload"
            accept="image/*"
            name="image"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image-upload"
            className="border rounded-full w-[200px] h-[200px] element-center cursor-pointer"
          >
            <CameraIcon className="!w-8 !h-8 text-gray-400 group-hover:text-gray-500" />
          </label>
        </div>
      </div>
      {error && <p className="text-red-500 text-center mt-1">{error}</p>}
    </>
  );
};

export default UploadImage;
