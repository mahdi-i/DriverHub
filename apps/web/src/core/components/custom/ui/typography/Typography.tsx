import {
  ListItemTypograph,
  TypographyTs,
} from "@/core/assets/@types/Typography";
import { cn } from "@/core/utils/shadcn/utils";
import { HTMLAttributes } from "react";

function TypographyBig({ children, className: className }: TypographyTs) {
  return (
    <h1
      className={cn(
        `scroll-m-20 text-center font-bold tracking-tight text-balance text-5xl sm:text-9xl`,
        className,
      )}
    >
      {children || "Lorem ipsum dolor"}
    </h1>
  );
}
function TypographyH1({ children, className: className }: TypographyTs) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-2xl sm:text-[57px]  font-extrabold tracking-tight text-balance",
        className,
      )}
    >
      {children || "Lorem ipsum dolor"}
    </h1>
  );
}

function TypographyH2({
  children,
  className: className,
  ...props
}: TypographyTs) {
  return (
    <h2
      className={cn(
        "scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    >
      {children || "Sit amet consectetur"}
    </h2>
  );
}

function TypographyH3({
  children,
  className: className,
  ...props
}: TypographyTs) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children || "Adipiscing elit"}
    </h3>
  );
}

function TypographyH4({
  children,
  className: className,
  ...props
}: TypographyTs) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children || "Sed do eiusmod"}
    </h4>
  );
}

function TypographyP({
  children,
  className: className,
  ...props
}: TypographyTs) {
  return (
    <p className={cn("text-md not-first:mt-2", className)} {...props}>
      {children || "Lorem ipsum dolor sit amet consectetur adipiscing."}
    </p>
  );
}
function TypographySpan({
  children,
  className: className,
  ...props
}: TypographyTs) {
  return (
    <span className={cn("text-base ", className)} {...props}>
      {children || "Lorem ipsum dolor sit amet consectetur adipiscing."}
    </span>
  );
}

function TypographyList({
  listItems,
  className: className,
  ...props
}: {
  listItems?: ListItemTypograph[] | string[];
} & HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {listItems?.map((item: ListItemTypograph | string, index: number) => (
        <li key={typeof item === "string" ? index : (item.id ?? index)}>
          {typeof item === "string" ? item : item.content}
        </li>
      ))}
    </ul>
  );
}

function TypographyLead({
  children,
  className: className,
  ...props
}: TypographyTs) {
  return (
    <p className={cn(className, "text-foreground leading-7")} {...props}>
      {children || "Dolor sit amet consectetur adipiscing elit."}
    </p>
  );
}

function TypographyLarge({
  children,
  className: className,
  ...props
}: TypographyTs) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props}>
      {children || "Eiusmod tempor"}
    </div>
  );
}

function TypographySmall({
  children,
  className: className,
  ...props
}: TypographyTs) {
  return (
    <small
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    >
      {children || "Incididunt ut"}
    </small>
  );
}

function TypographyMuted({
  children,
  className: className,
  ...props
}: TypographyTs) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children || "Labore et dolore"}
    </p>
  );
}

function TypographyInputErrorMassage({
  children,
  className: className,
  ...props
}: TypographyTs) {
  return (
    children && (
      <p
        className={cn(className, "text-destructive text-xs pt-1 ps-0.5")}
        {...props}
      >
        {children}
      </p>
    )
  );
}

export {
  TypographyBig,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInputErrorMassage,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall,
  TypographySpan,
};
