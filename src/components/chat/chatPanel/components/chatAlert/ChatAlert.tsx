import { AlertIcon } from "@/components/ui/icons/AlertIcon";
import { Typography } from "@/components/ui/typography/Typography";

import styles from "./ChatAlert.module.scss";
import type { ChatAlertProps } from "./ChatAlert.types";

export function ChatAlert({ message }: ChatAlertProps) {
  return (
    <div className={styles.alert} role="alert">
      <AlertIcon />
      <Typography variant="caption">{message}</Typography>
    </div>
  );
}
