const getImageUrl = async (imageFile: File, folder: string) => {

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("folder", folder);
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const image = (await response.json()) as { url: string };

        return image.url;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
    }
};

export default getImageUrl;