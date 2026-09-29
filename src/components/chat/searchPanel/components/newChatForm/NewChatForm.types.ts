import type { RecipientFormProps } from "./components/recipientForm/RecipientForm.types";

export type NewChatFormProps = RecipientFormProps & {
  chatError: string;
  isLocked: boolean;
  onNewChat: () => void;
};
