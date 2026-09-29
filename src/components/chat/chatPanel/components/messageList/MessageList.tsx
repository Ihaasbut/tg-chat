import { useEffect, useRef } from "react";

import { Typography } from "@/components/ui/typography/Typography";

import { EmptyMessages } from "./components/emptyMessages/EmptyMessages";
import { Message } from "./components/message/Message";
import { messageList } from "./MessageList.consts";
import styles from "./MessageList.module.scss";
import type { MessageListProps } from "./MessageList.types";

export function MessageList({ messages }: MessageListProps) {
  const { date } = messageList;
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesEl = messagesRef.current;

    messagesEl?.scrollTo({
      top: messagesEl.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div ref={messagesRef} className={styles.messages} aria-live="polite">
      <Typography variant="caption" className={styles.date}>
        {date}
      </Typography>

      {messages.length === 0 && <EmptyMessages />}

      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
