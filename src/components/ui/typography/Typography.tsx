import cn from "classnames";

import styles from "./Typography.module.scss";
import type { TypographyProps } from "./Typography.types";

export function Typography({
  as: Component = "p",
  variant = "body-s",
  children,
  className,
}: TypographyProps) {
  return (
    <Component className={cn(styles.typography, styles[variant], className)}>
      {children}
    </Component>
  );
}
