/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseTranslationsFromFormData(
  formData: FormData,
  supportedLangs: string[]
): any[] {
  const translations: any[] = [];
  for (let i = 0; i < supportedLangs.length; i++) {
    const language =
      formData.get(`translations[${i}][language]`)?.toString() ?? "";
    const title = formData.get(`translations[${i}][title]`)?.toString() ?? "";
    const description =
      formData.get(`translations[${i}][description]`)?.toString() ?? "";
    const editorContent =
      formData.get(`translations[${i}][editorContent]`)?.toString() ?? "";
    const tag = formData.get(`translations[${i}][tag]`)?.toString() ?? "";

    // تجاهل الترجمات الفارغة كلياً
    if (language || title || description || editorContent || tag) {
      translations.push({
        language,
        title,
        description,
        editorContent,
        tag,
      });
    }
  }
  return translations;
}
