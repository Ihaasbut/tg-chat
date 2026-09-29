import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import cn from "classnames";

import type { ChatOutletContext } from "@/components/chat/chatPanel/ChatPanel.types";
import { SearchPanel } from "@/components/chat/searchPanel/SearchPanel";
import { getInstance } from "@/utils/instance";

import styles from "./ChatPage.module.scss";

export function ChatPage() {
  const location = useLocation();
  const { chatId } = useParams();
  const hasContact = Boolean(chatId);
  const instance = getInstance(location.state);

  if (!instance) {
    return <Navigate to="/login" replace />;
  }

  const outletContext: ChatOutletContext = {
    instance,
  };

  return (
    <main className={styles.page}>
      <SearchPanel instance={instance} />

      <section
        className={cn(styles.panel, !hasContact && styles.withoutContact)}
      >
        <Outlet key={chatId} context={outletContext} />
      </section>
    </main>
  );
}
