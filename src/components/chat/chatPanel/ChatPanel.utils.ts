import {
  deleteNotification,
  getErrorText,
  receiveNotification,
} from "@/api/greenApi";
import type { IncomingNotification } from "@/api/greenApi.types";
import type { GreenApiInstance } from "@/utils/instance";

import type { TelegramContact } from "./ChatPanel.types";
import type { ChatMessage } from "./components/messageList/components/message/Message.types";

const pollRetryMs = 3000;

function toIncomingMessage(
  notification: IncomingNotification | null,
  currentChatId: string,
): ChatMessage | null {
  if (!notification) {
    return null;
  }

  const { body } = notification;
  const { typeWebhook, timestamp, idMessage, messageData, senderData } = body;
  const text = messageData?.textMessageData?.textMessage;
  const isCurrentChat = senderData?.chatId === currentChatId;

  if (
    typeWebhook !== "incomingMessageReceived" ||
    !idMessage ||
    !text ||
    !isCurrentChat
  ) {
    return null;
  }

  return {
    id: idMessage,
    text,
    direction: "incoming",
    timestamp: (timestamp ?? Date.now() / 1000) * 1000,
    status: "sent",
  };
}

export function startChatPolling(
  instance: GreenApiInstance,
  chatId: string,
  onIncoming: (message: ChatMessage) => void,
  onError: (message: string) => void,
) {
  const controller = new AbortController();
  const { signal } = controller;

  async function poll() {
    while (!signal.aborted) {
      try {
        const notification = await receiveNotification(instance, signal);
        onError("");

        const incoming = toIncomingMessage(notification, chatId);

        if (incoming) {
          onIncoming(incoming);
        }

        if (notification) {
          await deleteNotification(instance, notification.receiptId, signal);
        }
      } catch (pollError) {
        if (signal.aborted) {
          return;
        }

        onError(getErrorText(pollError));
        await new Promise((resolve) => window.setTimeout(resolve, pollRetryMs));
      }
    }
  }

  poll();

  return () => controller.abort();
}

export function getContact(locationState: unknown) {
  if (
    locationState &&
    typeof locationState === "object" &&
    "contact" in locationState
  ) {
    const { contact } = locationState as { contact?: TelegramContact };

    return contact ?? null;
  }

  return null;
}
