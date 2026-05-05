import { HTMLAttributes, ReactNode } from "react";

export interface TypographyTs extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

export interface ListItemTypograph {
  id?: string | number;
  content: string;
}
