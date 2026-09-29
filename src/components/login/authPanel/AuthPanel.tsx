import { ShieldCheckIcon } from "@/components/ui/icons/ShieldCheckIcon";
import { Logo } from "@/components/ui/logo/Logo";
import { Typography } from "@/components/ui/typography/Typography";

import { authPanel } from "./AuthPanel.consts";
import styles from "./AuthPanel.module.scss";
import { AuthForm } from "./components/authForm/AuthForm";

export function AuthPanel() {
  const { eyebrow, title, titleId, description, securityNote } = authPanel;

  return (
    <section className={styles.card} aria-labelledby={titleId}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.heading}>
        <Typography variant="caption" className={styles.eyebrow}>
          {eyebrow}
        </Typography>
        <div id={titleId}>
          <Typography variant="h1">{title}</Typography>
        </div>
        <Typography variant="body-l" className={styles.description}>
          {description}
        </Typography>
      </div>

      <AuthForm />

      <div className={styles.securityNote}>
        <ShieldCheckIcon />
        <Typography variant="caption">{securityNote}</Typography>
      </div>
    </section>
  );
}
