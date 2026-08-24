import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  {
    variants: {
      variant: {
        primary:
          "bg-fg text-bg hover:opacity-90 shadow-[var(--shadow-border)]",
        ghost:
          "bg-transparent text-fg hover:bg-elevated shadow-[var(--shadow-border)]",
        leader: "bg-primary text-primary-fg hover:opacity-90",
        link: "bg-transparent text-muted hover:text-fg px-0 h-auto",
      },
      size: {
        md: "h-11 px-5 text-sm rounded-md",
        sm: "h-9 px-3.5 text-xs rounded-sm",
        lg: "h-12 px-6 text-sm rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(function Button({ className, variant, size, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});
