import cn from "classnames";

import { ChatIcon } from "@/components/ui/icons/ChatIcon";
import { Typography } from "@/components/ui/typography/Typography";

import { noContact } from "./NoContact.consts";
import styles from "./NoContact.module.scss";

export function NoContact() {
  const { title, description } = noContact;

  return (
    <div className={styles.noContact}>
      <div className={styles.graphic}>
        <span className={cn(styles.bubble, styles.bubbleOne)} />
        <span className={cn(styles.bubble, styles.bubbleTwo)} />
        <ChatIcon />
      </div>

      <Typography variant="h2">{title}</Typography>

      <Typography variant="body-s" className={styles.description}>
        {description}
      </Typography>
    </div>
  );
}
