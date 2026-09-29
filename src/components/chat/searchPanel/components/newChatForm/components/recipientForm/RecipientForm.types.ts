import type { SubmitEventHandler } from "react";

export interface RecipientFormProps {
  phoneNumber: string;
  isChecking: boolean;
  onPhoneChange: (value: string) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
}
