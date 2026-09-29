import type { ReactNode } from "react";

export type ButtonVariant = "blue" | "light";
export type ButtonType = "button" | "submit";

export interface ButtonProps {
  children: ReactNode;
  variant: ButtonVariant;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  skipPadding?: boolean;
}
