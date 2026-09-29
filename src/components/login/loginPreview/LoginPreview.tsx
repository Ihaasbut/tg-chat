import cn from "classnames";

import { ChatIcon } from "@/components/ui/icons/ChatIcon";
import { Typography } from "@/components/ui/typography/Typography";

import { FeatureList } from "./components/featureList/FeatureList";
import { loginPreview } from "./LoginPreview.consts";
import styles from "./LoginPreview.module.scss";

export function LoginPreview() {
  const { ariaLabel, title, description } = loginPreview;

  return (
    <aside className={styles.preview} aria-label={ariaLabel}>
      <span className={cn(styles.orbit, styles.orbitOne)} />
      <span className={cn(styles.orbit, styles.orbitTwo)} />

      <div className={styles.content}>
        <div className={styles.icon}>
          <ChatIcon />
        </div>
        <Typography variant="h1" className={styles.title}>
          {title}
        </Typography>
        <Typography variant="body-l" className={styles.description}>
          {description}
        </Typography>

        <FeatureList />
      </div>
    </aside>
  );
}
