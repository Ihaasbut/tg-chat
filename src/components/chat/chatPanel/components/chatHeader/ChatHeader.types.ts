import type { TelegramContact } from "../../ChatPanel.types";

export interface ChatHeaderProps {
  contact: TelegramContact;
  onNewChat: () => void;
}
