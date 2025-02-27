"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

type BtnDeleteProps<T> = {
  id: string;
  actionDelete: (id: string) => Promise<T>;
};

const BtnDelete = <T,>({ id, actionDelete }: BtnDeleteProps<T>) => {
  const t = useTranslations("Common.ConfirmDelete");

  const handleDelete = async () => {
    try {
      toast.loading("Deleting Item...");
      await actionDelete(id);
      toast.dismiss();
      toast.success("Item deleted successfully!");
    } catch (error) {
      toast.error(`Error deleting item! ${error}`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="p-2">
          <Trash2Icon className="text-red-500 !w-5 !h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300">
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleDelete}
          >
            {t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BtnDelete;
