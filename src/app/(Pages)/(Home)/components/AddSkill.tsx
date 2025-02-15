"use client";
import { actionAddSkill } from "@/server/db/skills";

const AddSkill = () => {
  return (
    <button className="bg-slate-400 px-3 py-2 rounded-md" onClick={() => actionAddSkill()}>
      Add Skill
    </button>
    
  );
};

export default AddSkill;
