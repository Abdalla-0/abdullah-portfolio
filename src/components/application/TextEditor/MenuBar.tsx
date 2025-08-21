"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Strikethrough
} from "lucide-react";
import { useState } from "react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [open, setOpen] = useState(false);
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 flex items-center gap-2 z-50">
      {/* Dropdown for Headings */}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Heading
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "bg-slate-200" : ""
            }
          >
            <Heading1 className="size-4 mr-2" /> Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-slate-200" : ""
            }
          >
            <Heading2 className="size-4 mr-2" /> Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "bg-slate-200" : ""
            }
          >
            <Heading3 className="size-4 mr-2" /> Heading 3
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* باقي الأوبشنز */}
      {Options.map((option, index) => (
        <ToggleGroup key={index} variant="outline" type="multiple">
          <Toggle pressed={option.preesed} onPressedChange={option.onClick}>
            {option.icon}
          </Toggle>
        </ToggleGroup>
      ))}

      <Button
        variant="ghost"
        type="button"
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const base64 = reader.result as string;
                editor.chain().focus().setImage({ src: base64 }).run();
              };
              reader.readAsDataURL(file);
            }
          };
          input.click();
        }}
      >
        <ImageIcon className="size-4" />
      </Button>
    </div>
  );
}
