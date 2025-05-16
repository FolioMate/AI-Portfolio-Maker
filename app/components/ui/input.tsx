import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

// Define the types for the props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, onChange, ...props }, ref) => {
    const controlledValue = value !== undefined && value !== null ? value : "";

    return (
      <input
        ref={ref}
        type={type}
        value={controlledValue}
        onChange={onChange}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        )}
        {...props}
      />
    );
  }
);

export default Input;
