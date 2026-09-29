import type { GreenApiInstance } from "@/utils/instance";

import type { ChatMessage } from "../messageList/components/message/Message.types";

export interface MessageFormProps {
  instance: GreenApiInstance;
  chatId: string;
  onAddMessage: (message: ChatMessage) => void;
  onMessageSent: (temporaryId: string, idMessage: string) => void;
  onMessageFailed: (temporaryId: string) => void;
  onError: (message: string) => void;
}
