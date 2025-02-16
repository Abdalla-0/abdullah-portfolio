import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type InputComponentProps<FieldValue extends FieldValues> = {
  label: string;
  name: Path<FieldValue>;
  type?: string;
  register: UseFormRegister<FieldValue>;
  error?: string;
  placeholder?: string;
};

const InputComponent = <FieldValue extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  placeholder,
}: InputComponentProps<FieldValue>) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} {...register(name)} />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default InputComponent;
