import type { ElementType, ReactNode } from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body-l"
  | "body-m"
  | "body-s"
  | "label"
  | "caption"
  | "button";

export interface TypographyProps {
  as?: ElementType;
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
}
