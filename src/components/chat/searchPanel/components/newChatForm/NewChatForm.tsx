import cn from "classnames";

import { Button } from "@/components/ui/button/Button";
import { FormError } from "@/components/ui/formError/FormError";
import { PlusIcon } from "@/components/ui/icons/PlusIcon";
import { Typography } from "@/components/ui/typography/Typography";

import { RecipientForm } from "./components/recipientForm/RecipientForm";
import { newChatForm } from "./NewChatForm.consts";
import styles from "./NewChatForm.module.scss";
import type { NewChatFormProps } from "./NewChatForm.types";

export function NewChatForm({
  chatError,
  isLocked,
  phoneNumber,
  isChecking,
  onPhoneChange,
  onSubmit,
  onNewChat,
}: NewChatFormProps) {
  const { eyebrow, title, description, newChatLabel } = newChatForm;

  return (
    <section className={styles.newChat} aria-label={title}>
      <div
        className={cn(isLocked && styles.locked)}
        inert={isLocked || undefined}
      >
        <Typography variant="caption" className={styles.eyebrow}>
          {eyebrow}
        </Typography>

        <Typography variant="h2">{title}</Typography>

        <Typography variant="body-s" className={styles.description}>
          {description}
        </Typography>

        <RecipientForm
          phoneNumber={phoneNumber}
          isChecking={isChecking}
          onPhoneChange={onPhoneChange}
          onSubmit={onSubmit}
        />

        {chatError && !isLocked && (
          <FormError data={{ message: chatError }} className={styles.error} />
        )}
      </div>

      {isLocked && (
        <div className={styles.overlay}>
          <Button variant="blue" onClick={onNewChat}>
            <PlusIcon />

            <Typography variant="caption">{newChatLabel}</Typography>
          </Button>
        </div>
      )}
    </section>
  );
}
