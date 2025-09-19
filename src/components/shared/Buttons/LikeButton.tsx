"use client";
import { Button } from "@/components/ui/button";
import { actionLike } from "@/server/actions/projects";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  projectId: string;
  likesCount: number;
  locale: string;
};

export default function LikeButton({ projectId, likesCount, locale }: Props) {
  const [likes, setLikes] = useState(likesCount);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const isLiked = localStorage.getItem(`liked-${projectId}`);
    if (isLiked) setLiked(true);
  }, [projectId]);

  const handleLike = async () => {
    if (liked) return;
    const updatedLikes = await actionLike(projectId, locale);
    setLiked(true);
    localStorage.setItem(`liked-${projectId}`, "true");
    setLikes(Number(updatedLikes));
  };

  return (
    <Button
      onClick={handleLike}
      className={`px-4 py-2 rounded transition w-fit text-white bg-blue-500`}
      disabled={liked}
    >
      {likes}
      <ThumbsUp className={`w-4 h-4 ${liked ? "text-white" : "text-black"}`} />
    </Button>
  );
}
