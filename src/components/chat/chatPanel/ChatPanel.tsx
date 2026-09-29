import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import styles from "./ChatPanel.module.scss";
import type { ChatOutletContext } from "./ChatPanel.types";
import { getContact, startChatPolling } from "./ChatPanel.utils";
import { ChatAlert } from "./components/chatAlert/ChatAlert";
import { ChatHeader } from "./components/chatHeader/ChatHeader";
import { MessageForm } from "./components/messageForm/MessageForm";
import type { ChatMessage } from "./components/messageList/components/message/Message.types";
import { MessageList } from "./components/messageList/MessageList";

export function ChatPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const { instance } = useOutletContext<ChatOutletContext>();
  const contact = getContact(location.state);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!contact) {
      return;
    }

    return startChatPolling(
      instance,
      contact.chatId,
      (incoming) =>
        setMessages((current) =>
          current.some((message) => message.id === incoming.id)
            ? current
            : [...current, incoming],
        ),
      setError,
    );
  }, [contact, instance]);

  if (!contact) {
    return <Navigate to="/chat" replace state={{ instance }} />;
  }

  function handleNewChat() {
    navigate("/chat", {
      replace: true,
      state: { instance },
    });
  }

  function handleAddMessage(message: ChatMessage) {
    setMessages((current) => [...current, message]);
  }

  function handleMessageSent(temporaryId: string, idMessage: string) {
    setMessages((current) =>
      current.map((message) =>
        message.id === temporaryId
          ? { ...message, id: idMessage, status: "sent" }
          : message,
      ),
    );
  }

  function handleMessageFailed(temporaryId: string) {
    setMessages((current) =>
      current.map((message) =>
        message.id === temporaryId ? { ...message, status: "failed" } : message,
      ),
    );
  }

  return (
    <div className={styles.conversation}>
      <ChatHeader contact={contact} onNewChat={handleNewChat} />

      <MessageList messages={messages} />

      {error && <ChatAlert message={error} />}

      <MessageForm
        instance={instance}
        chatId={contact.chatId}
        onAddMessage={handleAddMessage}
        onMessageSent={handleMessageSent}
        onMessageFailed={handleMessageFailed}
        onError={setError}
      />
    </div>
  );
}

export default ChatPanel;
