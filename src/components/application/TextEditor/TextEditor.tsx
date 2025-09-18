"use client";

import Highlight from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import "./text-editor.css";

interface RichTextEditorProps {
  editorContent: string;
  onChange: (content: string) => void;
}
export default function TextEditor({
  editorContent,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ms-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ms-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "tiptap-image-style",
        },
      }),
    ],
    content: editorContent,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="tiptap">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
