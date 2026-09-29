export type InputType = "text" | "url" | "password" | "number";
export type InputMode = "numeric" | "tel";

export interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: InputType;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  inputMode?: InputMode;
  prefix?: string;
}
