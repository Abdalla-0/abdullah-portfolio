"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";
import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type InputComponentProps<FieldValue extends FieldValues> = {
  label?: string;
  name: Path<FieldValue>;
  type?: string;
  register?: UseFormRegister<FieldValue>;
  error?: string;
  placeholder?: string;
  className?: string;
  btnPassIconClass?: string;
  passIconClass?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
);

const InputComponent = <FieldValue extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  onChange,
  className,
  btnPassIconClass,
  passIconClass,
  placeholder,
}: InputComponentProps<FieldValue>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      {type === "password" && (
        <button
          type="button"
          className={`absolute top-1/2 end-4 ${btnPassIconClass}`}
          onClick={handleShowPassword}
        >
          {showPassword ? (
            <EyeIcon className={passIconClass} />
          ) : (
            <EyeOffIcon className={passIconClass} />
          )}
        </button>
      )}
      {label && <Label htmlFor={name}>{label}</Label>}

      {type === "textarea" ? (
        <Textarea
          id={name}
          placeholder={placeholder}
          {...(register ? register(name) : {})}
          onChange={onChange}
          className={`border rounded-md p-2 w-full ${className}`}
        />
      ) : (
        <Input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          {...(register
            ? register(name, type === "number" ? { valueAsNumber: true } : {})
            : {})}
          onChange={onChange}
          className={className}
        />
      )}

      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default InputComponent;
