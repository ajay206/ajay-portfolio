import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-md bg-elevated px-3.5 text-sm text-fg placeholder:text-subtle shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out focus:outline-none focus:shadow-[var(--shadow-border-hover)]";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(fieldClass, "h-11", className)}
      {...props}
    />
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(fieldClass, "min-h-36 py-3 resize-y", className)}
      {...props}
    />
  );
});
