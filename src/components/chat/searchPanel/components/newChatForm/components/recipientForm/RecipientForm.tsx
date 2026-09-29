import { Button } from "@/components/ui/button/Button";
import { ChevronRightIcon } from "@/components/ui/icons/ChevronRightIcon";
import { Input } from "@/components/ui/input/Input";
import { Typography } from "@/components/ui/typography/Typography";

import { recipientForm } from "./RecipientForm.consts";
import styles from "./RecipientForm.module.scss";
import type { RecipientFormProps } from "./RecipientForm.types";

export function RecipientForm({
  phoneNumber,
  isChecking,
  onPhoneChange,
  onSubmit,
}: RecipientFormProps) {
  const {
    phoneLabel,
    phoneName,
    phonePrefix,
    phonePlaceholder,
    submitLabel,
    checkingLabel,
  } = recipientForm;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        label={phoneLabel}
        name={phoneName}
        prefix={phonePrefix}
        value={phoneNumber}
        onChange={onPhoneChange}
        placeholder={phonePlaceholder}
        inputMode="tel"
        autoComplete="tel"
        required
      />

      <Button variant="blue" type="submit" disabled={isChecking}>
        {isChecking && (
          <Typography variant="button">{checkingLabel}</Typography>
        )}

        {!isChecking && (
          <>
            <Typography variant="button">{submitLabel}</Typography>
            <ChevronRightIcon />
          </>
        )}
      </Button>
    </form>
  );
}
