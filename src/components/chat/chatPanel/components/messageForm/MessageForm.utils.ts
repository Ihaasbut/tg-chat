import type { SubmitEvent } from "react";

import { getErrorText, sendMessage } from "@/api/greenApi";
import type { GreenApiInstance } from "@/utils/instance";

import type { ChatMessage } from "../messageList/components/message/Message.types";
import { messageForm } from "./MessageForm.consts";

function validateMessageText(value: string) {
  const { maxLength, messageTooLong } = messageForm;
  const text = value.trim();

  if (!text) {
    return { text: "" };
  }

  if (text.length > maxLength) {
    return { text: "", error: messageTooLong };
  }

  return { text };
}

function createPendingMessage(text: string): ChatMessage {
  const temporaryId = crypto.randomUUID();
  const temporaryStatus = "sending";

  return {
    id: temporaryId,
    text,
    direction: "outgoing",
    timestamp: Date.now(),
    status: temporaryStatus,
  };
}

async function sendToGreenApi(
  instance: GreenApiInstance,
  chatId: string,
  text: string,
  pendingId: string,
  onMessageSent: (temporaryId: string, idMessage: string) => void,
  onMessageFailed: (temporaryId: string) => void,
  onError: (message: string) => void,
  setIsSending: (value: boolean) => void,
) {
  try {
    const { idMessage } = await sendMessage(instance, chatId, text);
    onMessageSent(pendingId, idMessage);
  } catch (sendError) {
    onError(getErrorText(sendError));
    onMessageFailed(pendingId);
  } finally {
    setIsSending(false);
  }
}

export function createSubmitHandler(
  instance: GreenApiInstance,
  chatId: string,
  isSending: boolean,
  messageText: string,
  onAddMessage: (message: ChatMessage) => void,
  onMessageSent: (temporaryId: string, idMessage: string) => void,
  onMessageFailed: (temporaryId: string) => void,
  onError: (message: string) => void,
  setMessageText: (value: string) => void,
  setIsSending: (value: boolean) => void,
): (event: SubmitEvent<HTMLFormElement>) => Promise<void> {
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSending) {
      return;
    }

    const { text, error } = validateMessageText(messageText);

    if (error) {
      onError(error);
      return;
    }

    if (!text) {
      return;
    }

    const pendingMessage = createPendingMessage(text);

    onError("");
    setMessageText("");
    setIsSending(true);
    onAddMessage(pendingMessage);

    await sendToGreenApi(
      instance,
      chatId,
      text,
      pendingMessage.id,
      onMessageSent,
      onMessageFailed,
      onError,
      setIsSending,
    );
  }

  return handleSubmit;
}
