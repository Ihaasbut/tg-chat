import cn from "classnames";

import { Typography } from "../typography/Typography";
import styles from "./FormError.module.scss";
import type { FormErrorProps } from "./FormError.types";

export function FormError({ data, className }: FormErrorProps) {
  const { message } = data;

  return (
    <div className={cn(styles.error, className)} role="alert">
      <Typography variant="body-s">{message}</Typography>
    </div>
  );
}
