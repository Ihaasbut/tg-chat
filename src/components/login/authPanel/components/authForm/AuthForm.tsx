import { type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button/Button";
import { FormError } from "@/components/ui/formError/FormError";
import { ChevronRightIcon } from "@/components/ui/icons/ChevronRightIcon";
import { Input } from "@/components/ui/input/Input";
import { Typography } from "@/components/ui/typography/Typography";

import { authForm, emptyInstance } from "./AuthForm.consts";
import styles from "./AuthForm.module.scss";
import { checkInstance } from "./AuthForm.utils";

export function AuthForm() {
  const navigate = useNavigate();
  const [instance, setInstance] = useState(emptyInstance);
  const [error, setError] = useState("");
  const {
    apiUrlLabel,
    apiUrlPlaceholder,
    idInstanceLabel,
    idInstancePlaceholder,
    apiTokenLabel,
    apiTokenPlaceholder,
    submitLabel,
  } = authForm;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const nextInstance = {
      apiUrl: instance.apiUrl.trim().replace(/\/+$/, ""),
      idInstance: instance.idInstance.trim(),
      apiTokenInstance: instance.apiTokenInstance.trim(),
    };

    const result = checkInstance(nextInstance);
    if (result !== true) {
      setError(result);
      return;
    }

    navigate("/chat", {
      replace: true,
      state: { instance: nextInstance },
    });
  }

  function handleApiUrlChange(apiUrl: string) {
    setInstance({ ...instance, apiUrl });
  }

  function handleIdInstanceChange(idInstance: string) {
    setInstance({ ...instance, idInstance });
  }

  function handleApiTokenChange(apiTokenInstance: string) {
    setInstance({ ...instance, apiTokenInstance });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label={apiUrlLabel}
        type="url"
        name="apiUrl"
        value={instance.apiUrl}
        onChange={handleApiUrlChange}
        placeholder={apiUrlPlaceholder}
        autoComplete="url"
        required
      />

      <Input
        label={idInstanceLabel}
        name="idInstance"
        value={instance.idInstance}
        onChange={handleIdInstanceChange}
        placeholder={idInstancePlaceholder}
        inputMode="numeric"
        autoComplete="off"
        required
        type="number"
      />

      <Input
        label={apiTokenLabel}
        type="password"
        name="apiTokenInstance"
        value={instance.apiTokenInstance}
        onChange={handleApiTokenChange}
        placeholder={apiTokenPlaceholder}
        autoComplete="off"
        required
      />

      {error && <FormError data={{ message: error }} />}

      <Button variant="blue" type="submit">
        <Typography variant="button">{submitLabel}</Typography>
        <ChevronRightIcon />
      </Button>
    </form>
  );
}
