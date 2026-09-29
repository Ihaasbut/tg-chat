export type MessageDirection = "incoming" | "outgoing";

export type MessageStatus = "sending" | "sent" | "failed";

export interface ChatMessage {
  id: string;
  text: string;
  direction: MessageDirection;
  timestamp: number;
  status: MessageStatus;
}

export interface MessageProps {
  message: ChatMessage;
}
