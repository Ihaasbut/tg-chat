import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button/Button";
import { LogoutIcon } from "@/components/ui/icons/LogoutIcon";
import { Logo } from "@/components/ui/logo/Logo";

import styles from "./SearchHeader.module.scss";

export function SearchHeader() {
  const navigate = useNavigate();

  function handleDisconnect() {
    navigate("/login", { replace: true });
  }

  return (
    <header className={styles.header}>
      <Logo compact />

      <Button
        variant="light"
        skipPadding
        onClick={handleDisconnect}
        ariaLabel="Отключиться"
      >
        <LogoutIcon />
      </Button>
    </header>
  );
}
