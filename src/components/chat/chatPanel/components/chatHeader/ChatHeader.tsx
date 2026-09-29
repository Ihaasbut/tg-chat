import { Button } from "@/components/ui/button/Button";
import { ChevronLeftIcon } from "@/components/ui/icons/ChevronLeftIcon";
import { Typography } from "@/components/ui/typography/Typography";

import { chatHeader } from "./ChatHeader.consts";
import styles from "./ChatHeader.module.scss";
import type { ChatHeaderProps } from "./ChatHeader.types";

export function ChatHeader({ contact, onNewChat }: ChatHeaderProps) {
  const { username, phoneNumber } = contact;
  const { backAriaLabel, messenger } = chatHeader;
  const contactName = username || `+${phoneNumber}`;
  const avatarLabel =
    username?.replace("@", "").charAt(0).toUpperCase() || phoneNumber.slice(-2);

  return (
    <header className={styles.header}>
      <div className={styles.mobileBack}>
        <Button
          variant="light"
          skipPadding
          onClick={onNewChat}
          ariaLabel={backAriaLabel}
        >
          <ChevronLeftIcon />
        </Button>
      </div>

      <div className={styles.avatar} aria-hidden="true">
        <Typography variant="label">{avatarLabel}</Typography>
      </div>

      <div className={styles.contact}>
        <Typography variant="label">{contactName}</Typography>

        <div className={styles.messenger}>
          <span className={styles.onlineDot} />

          <Typography variant="caption">{messenger}</Typography>
        </div>
      </div>
    </header>
  );
}
