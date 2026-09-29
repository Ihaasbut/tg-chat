import { MessageIcon } from "@/components/ui/icons/MessageIcon";
import { Typography } from "@/components/ui/typography/Typography";

import { emptyMessages } from "./EmptyMessages.consts";
import styles from "./EmptyMessages.module.scss";

export function EmptyMessages() {
  const { title, description } = emptyMessages;

  return (
    <div className={styles.empty}>
      <span className={styles.emptyIcon}>
        <MessageIcon />
      </span>

      <Typography variant="label">{title}</Typography>

      <Typography variant="body-s">{description}</Typography>
    </div>
  );
}
