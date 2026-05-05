import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/core/utils/shadcn/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm   transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm " +
          "hover:bg-primary-dark hover:shadow-sm hover:scale-[1.01] " +
          "active:scale-95 active:shadow-sm " +
          "transform transition-all duration-200",

        secondary:
          "bg-secondary text-secondary-foreground shadow-sm " +
          "hover:bg-secondary/90 hover:shadow-sm hover:scale-[1.01] " +
          "active:scale-95 active:shadow-sm " +
          "transform transition-all duration-200",

        outline:
          "border-2 border-primary text-primary bg-transparent " +
          "hover:bg-primary/10 hover:scale-[1.01] hover:shadow-sm " +
          "active:scale-95 " +
          "transform transition-all duration-200",

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm " +
          "hover:bg-destructive/90 hover:scale-[1.01] hover:shadow-sm " +
          "active:scale-95 " +
          "transform transition-all duration-200",

        ghost:
          "bg-white/10 backdrop-blur-sm text-foreground " +
          "hover:bg-white/20 hover:scale-[1.01] " +
          "active:scale-95 " +
          "transform transition-all duration-200",

        link:
          "text-primary underline-offset-4 hover:underline " +
          "hover:scale-[1.01] " +
          "active:scale-95 " +
          "transform transition-all duration-200 p-0",
      },
      size: {
        default: "h-10 px-6 py-2 text-base",
        sm: "h-8 px-4 text-sm",
        lg: "h-14 px-8 text-lg font-bold",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
