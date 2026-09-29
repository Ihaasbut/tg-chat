import cn from "classnames";

import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.types";

export function Button({
  children,
  variant,
  type = "button",
  disabled,
  onClick,
  ariaLabel,
  skipPadding = false,
}: ButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        skipPadding && styles.skipPadding,
      )}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
