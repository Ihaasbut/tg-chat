import { AuthPanel } from "@/components/login/authPanel/AuthPanel";
import { LoginPreview } from "@/components/login/loginPreview/LoginPreview";

import styles from "./LoginPage.module.scss";

export function LoginPage() {
  return (
    <main className={styles.page}>
      <AuthPanel />
      <LoginPreview />
    </main>
  );
}
