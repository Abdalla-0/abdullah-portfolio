"use client";
import { Button } from "@/components/ui/button";
import { actionLike } from "@/server/actions/projects";
import { ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  projectId: string;
  likesCount: number;
  locale: string;
};

export default function LikeButton({ projectId, likesCount, locale }: Props) {
  const [likes, setLikes] = useState(likesCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Common");
  useEffect(() => {
    const isLiked = localStorage.getItem(`liked-${projectId}`);
    if (isLiked) setLiked(true);
  }, [projectId]);

  const handleLike = async () => {
    if (liked) return;
    setLoading(true);
    try {
      const updatedLikes = await actionLike(projectId, locale);
      setLiked(true);
      localStorage.setItem(`liked-${projectId}`, "true");
      setLikes(Number(updatedLikes));
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLike}
      className={`px-4 w-fit py-2 rounded transition text-white bg-blue-500 hover:bg-blue-600`}
      disabled={loading || liked}
    >
      {loading ? (
        t("loading")
      ) : (
        <>
          <ThumbsUp className={`w-4 h-4`} />
          {likes}
        </>
      )}
    </Button>
  );
}
