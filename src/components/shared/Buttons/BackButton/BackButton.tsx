"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BackButton = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="px-4 py-2 text-primay rounded-lg"
      variant={"outline"}
      type="button"
    >
      {title}
    </Button>
  );
};

export default BackButton;
