import cn from "classnames";

import { Typography } from "@/components/ui/typography/Typography";
import { formatDateTime, formatTime } from "@/utils/date";

import { sendStatus } from "./Message.consts";
import styles from "./Message.module.scss";
import type { MessageProps } from "./Message.types";

export function Message({ message }: MessageProps) {
  const { text, timestamp, direction, status } = message;
  const { label, mark } = sendStatus[status];

  return (
    <article className={cn(styles.message, styles[direction])}>
      <Typography variant="body-m">{text}</Typography>

      <footer className={styles.footer}>
        <span title={formatDateTime(timestamp)}>
          <Typography variant="caption">{formatTime(timestamp)}</Typography>
        </span>

        {direction === "outgoing" && (
          <span
            className={cn(styles.status, styles[status])}
            aria-label={label}
          >
            <Typography variant="caption">{mark}</Typography>
          </span>
        )}
      </footer>
    </article>
  );
}
