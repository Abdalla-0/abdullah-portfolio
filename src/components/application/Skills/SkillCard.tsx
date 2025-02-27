import { Skill } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type SkillCardProps = {
  skillLink: string;
  skill: Skill;
};
const SkillCard = ({ skill, skillLink }: SkillCardProps) => {
  return (
    <Link
      href={`${skillLink}`}
      key={skill.id}
      className="relative p-8 bg-gray-200 rounded-xl text-center block"
    >
      <Image
        src={skill.image as string}
        alt={skill.title}
        width={100}
        height={100}
        className="max-w-full h-[90px] object-contain mx-auto"
      />
      <h2 className="mt-2 text-center font-bold text-lg">{skill.title}</h2>
    </Link>
  );
};

export default SkillCard;
