import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const MaterialInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "peer block w-full border-0 bg-background py-1.5 text-foreground placeholder:text-foreground/50 focus:outline-none sm:text-sm sm:leading-6",
            className,
          )}
          ref={ref}
          autoComplete="off"
          {...props}
        />
        <div
          className="absolute inset-x-0 bottom-0 border-b border-foreground/50 peer-focus:border-b-2 peer-focus:border-foreground transition-all duration-300"
          aria-hidden="true"
        />
      </div>
    );
  },
);

MaterialInput.displayName = "Input";
export { MaterialInput };
