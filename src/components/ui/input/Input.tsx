import type { ChangeEvent } from "react";

import { Typography } from "../typography/Typography";
import styles from "./Input.module.scss";
import type { InputProps } from "./Input.types";

export function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  required,
  inputMode,
  prefix,
}: InputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className={styles.input} htmlFor={name}>
      <Typography variant="label" className={styles.label}>
        {label}
      </Typography>

      <span className={prefix && styles.withPrefix}>
        {prefix && <span aria-hidden="true">{prefix}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          inputMode={inputMode}
        />
      </span>
    </label>
  );
}
