import { FieldValues, FieldPath, ControllerProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type CustomFormFieldProps = {
  label: string;
  type?: "text" | "number" | "email" | "password" | "tel" | "url";
  placeholderText?: string;
  optional?: boolean;
  disabled?: boolean;
  withAutoComplete?: boolean;
};

const CustomInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  type = "text",
  placeholderText,
  optional = false,
  disabled,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> &
  CustomFormFieldProps) => {
  return (
    <FormField
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-2">
            <FormLabel className="font-semibold text-gray-600">
              {label}{" "}
              {optional && (
                <span className="text-sm font-normal">(Optional)</span>
              )}
            </FormLabel>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholderText}
                disabled={disabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
      {...props}
    />
  );
};

export default CustomInput;
