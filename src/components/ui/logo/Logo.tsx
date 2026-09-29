import cn from "classnames";

import { TelegramIcon } from "../icons/TelegramIcon";
import { Typography } from "../typography/Typography";
import styles from "./Logo.module.scss";
import type { LogoProps } from "./Logo.types";

export function Logo({ compact = false }: LogoProps) {
  return (
    <div className={cn(styles.logo, compact && styles.compact)}>
      <TelegramIcon />
      <Typography variant="h3">Telegram</Typography>
    </div>
  );
}
