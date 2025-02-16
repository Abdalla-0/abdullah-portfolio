"use client";
import InputComponent from "@/components/common/Form/InputComponent/InputComponent";
import { Button } from "@/components/ui/button";
import { actionAddSkill } from "@/server/db/skills";
import { addSkillSchema } from "@/validations/skillSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skill } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

const AddSkill = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Skill>({ mode: "onBlur", resolver: zodResolver(addSkillSchema) });

  const submitForm: SubmitHandler<Skill> = (data) => {
    actionAddSkill(data);
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(submitForm)}>
      <InputComponent
        label="Title"
        name="title"
        register={register}
        placeholder="Title"
        error={errors.title?.message}
      />
      <Button type="submit" className="bg-primary px-3 py-2 rounded-md">
        Add Skill
      </Button>
    </form>
  );
};

export default AddSkill;
