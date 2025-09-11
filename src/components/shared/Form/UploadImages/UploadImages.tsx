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
  order?: number;
}

interface UploadImagesProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  existingImages?: string[];
  setExistingUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setImagesData?: React.Dispatch<
    React.SetStateAction<{ file: File | null; order?: number }[]>
  >;
  error?: string;
}

const UploadImages = <T extends FieldValues>({
  setValue,
  existingImages = [],
  setExistingUrls,
  setImagesData,
  error,
}: UploadImagesProps<T>) => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (initialLoadRef.current && existingImages.length > 0) {
      const existing: UploadedImage[] = existingImages.map((url, index) => ({
        id: uuidv4(),
        file: null,
        previewUrl: url,
        order: index + 1,
      }));
      setImages(existing);
      initialLoadRef.current = false;
    }
  }, [existingImages]);

  useEffect(() => {
    const onlyNewFiles = images
      .filter((img) => img.file instanceof File)
      .map((img) => img.file!);

    const remainingExistingUrls = images
      .filter((img) => img.file === null)
      .map((img) => img.previewUrl);

    setExistingUrls(remainingExistingUrls);

    setValue("gallery" as Path<T>, onlyNewFiles as any, {
      shouldValidate: true,
    });

    if (setImagesData) {
      const structured = images.map((img) => ({
        file: img.file,
        order: img.order,
      }));
      setImagesData(structured);
    }
  }, [images, setValue, setExistingUrls, setImagesData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: UploadedImage = {
          id: uuidv4(),
          file,
          previewUrl: reader.result as string,
          order: undefined,
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleOrderChange = (id: string, value: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, order: isNaN(value) ? undefined : value }
          : img
      )
    );
  };

  return (
    <div className="w-full mt-5">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {images.map((img) => (
            <div key={img.id}>
              <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden group">
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
              <div className="mt-1">
                <input
                  type="number"
                  placeholder="Order"
                  value={img.order || ""}
                  onChange={(e) =>
                    handleOrderChange(img.id, parseInt(e.target.value))
                  }
                  className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default UploadImages;
