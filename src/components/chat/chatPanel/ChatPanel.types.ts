import type { GreenApiInstance } from "@/utils/instance";

export interface TelegramContact {
  chatId: string;
  phoneNumber: string;
  username?: string;
}

export interface ChatOutletContext {
  instance: GreenApiInstance;
}
