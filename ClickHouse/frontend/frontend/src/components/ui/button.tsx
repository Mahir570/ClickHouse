import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// New button design with a neumorphic, modern look
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none shadow-sm hover:shadow-md active:shadow-inner",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary dark:text-white",
        destructive:
          "bg-gradient-to-br from-red-500 to-red-400 text-white hover:from-red-600 hover:to-red-500",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted dark:border-muted/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "bg-transparent hover:bg-muted dark:hover:bg-muted/30 text-muted-foreground",
        link: "text-primary underline underline-offset-4 hover:text-primary/80",
      },
      size: {
        default: "h-10 px-5 text-sm",
        sm: "h-8 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
