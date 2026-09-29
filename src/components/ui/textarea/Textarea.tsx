import type { ChangeEvent } from "react";

import styles from "./Textarea.module.scss";
import type { TextareaProps } from "./Textarea.types";

export function Textarea({
  value,
  onChange,
  ariaLabel,
  placeholder,
  maxLength,
}: TextareaProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      maxLength={maxLength}
      aria-label={ariaLabel}
      rows={1}
    />
  );
}
