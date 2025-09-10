import { Skill } from "@prisma/client";
import Image from "next/image";

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <div
      key={skill.id}
      className="relative p-8 bg-gray-200 rounded-xl text-center block"
    >
      <Image
        src={skill.image as string}
        alt={"Skill Image"}
        width={100}
        height={100}
        className="max-w-full h-[90px] object-contain mx-auto"
      />
    </div>
  );
};

export default SkillCard;
