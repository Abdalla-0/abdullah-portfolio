/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Path, UseFormSetValue, FieldValues } from "react-hook-form";

interface UploadedImage {
  id: string;
  file: File | null;
  previewUrl: string;
}

interface UploadImagesProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  existingImages?: string[];
  setExistingUrls: React.Dispatch<React.SetStateAction<string[]>>;
  error?: string;
}

const UploadImages = <T extends FieldValues>({
  setValue,
  existingImages = [],
  setExistingUrls,
  error,
}: UploadImagesProps<T>) => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  // استخدام useRef لتجنب إعادة تهيئة الصور الموجودة في كل مرة
  const initialLoadRef = useRef(true);

  useEffect(() => {
    // قم بتهيئة الصور الموجودة مرة واحدة فقط عند تحميل الكومبوننت لأول مرة
    if (initialLoadRef.current && existingImages.length > 0) {
      const existing: UploadedImage[] = existingImages.map((url) => ({
        id: uuidv4(),
        file: null,
        previewUrl: url,
      }));
      setImages(existing);
      initialLoadRef.current = false;
    }
  }, [existingImages]); // اعتمد على existingImages فقط هنا

  // useEffect آخر لتحديث setValue("gallery") و setExistingUrls
  // كلما تغيرت مصفوفة الصور (images state)

  useEffect(() => {
    const onlyNewFiles = images
      .filter((img) => img.file instanceof File)
      .map((img) => img.file!);

    const remainingExistingUrls = images
      .filter((img) => img.file === null)
      .map((img) => img.previewUrl);

    // **** التعديل هنا: نستخدم setExistingUrls لتمرير القائمة الصحيحة لـ FormProject ****
    // هذه القائمة هي التي تحتوي على الـ URLs الموجودة والتي لم يتم إزالتها من الـ UI
    setExistingUrls(remainingExistingUrls);

    // قم بتعيين قيمة "gallery" في hook form فقط للملفات الجديدة
    // لكي يتم التعامل معها على أنها ملفات جديدة للتحميل
    setValue("gallery" as Path<T>, onlyNewFiles as any, {
      shouldValidate: true,
    });
  }, [images, setValue, setExistingUrls]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: UploadedImage = {
          id: uuidv4(),
          file,
          previewUrl: reader.result as string,
        };

        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="w-full !mt-5">
      <label
        htmlFor="multi-upload"
        className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl w-full h-20 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition"
      >
        <span className="text-gray-500 text-sm">Click to upload</span>
        <input
          id="multi-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden group"
            >
              <Image
                src={img.previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-center mt-1">{error}</p>}
    </div>
  );
};

export default UploadImages;
