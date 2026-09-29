import { type KeyboardEvent, useState } from "react";
import cn from "classnames";

import { Button } from "@/components/ui/button/Button";
import { SendIcon } from "@/components/ui/icons/SendIcon";
import { Spinner } from "@/components/ui/spinner/Spinner";
import { Textarea } from "@/components/ui/textarea/Textarea";
import { Typography } from "@/components/ui/typography/Typography";

import { messageForm } from "./MessageForm.consts";
import styles from "./MessageForm.module.scss";
import type { MessageFormProps } from "./MessageForm.types";
import { createSubmitHandler } from "./MessageForm.utils";

export function MessageForm({
  instance,
  chatId,
  onAddMessage,
  onMessageSent,
  onMessageFailed,
  onError,
}: MessageFormProps) {
  const { placeholder, maxLength, countThreshold, ariaLabel, sendAriaLabel } =
    messageForm;
  const [value, setValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const isDisabled = isSending || !value.trim();
  const showCount = value.length >= countThreshold;
  const handleSubmit = createSubmitHandler(
    instance,
    chatId,
    isSending,
    value,
    onAddMessage,
    onMessageSent,
    onMessageFailed,
    onError,
    setValue,
    setIsSending,
  );

  function handleSubmitOnEnter(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();
    event.currentTarget.requestSubmit();
  }

  return (
    <form
      className={cn(styles.messageForm, showCount && styles.withCount)}
      onSubmit={handleSubmit}
      onKeyDown={handleSubmitOnEnter}
    >
      <Textarea
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        maxLength={maxLength}
        ariaLabel={ariaLabel}
      />

      {showCount && (
        <Typography variant="caption" className={styles.count}>
          {value.length}/{maxLength}
        </Typography>
      )}

      <Button
        variant="blue"
        skipPadding
        type="submit"
        disabled={isDisabled}
        ariaLabel={sendAriaLabel}
      >
        {isSending && <Spinner />}
        {!isSending && <SendIcon />}
      </Button>
    </form>
  );
}
