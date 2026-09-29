export interface GreenApiError {
  status?: boolean | "error";
  reason?: string;
  message?: string;
  data?: {
    reason?: string;
  };
}

export interface CheckAccountResponse {
  exist: boolean;
  chatId: string;
  username?: string;
  phoneNumber?: number;
  fromCache?: boolean;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface DeleteNotificationResponse {
  result: boolean;
  reason?: string;
}

export type TypeWebhook =
  | "incomingMessageReceived"
  | "outgoingMessageReceived"
  | "outgoingAPIMessageReceived"
  | "outgoingMessageStatus";

export type TypeMessage = "textMessage";

export interface NotificationSenderData {
  chatId?: string;
  sender?: string;
  senderName?: string;
  senderContactName?: string;
  senderPhoneNumber?: number;
}

export interface NotificationTextMessageData {
  textMessage?: string;
}

export interface NotificationMessageData {
  typeMessage?: TypeMessage;
  textMessageData?: NotificationTextMessageData;
}

export interface NotificationBody {
  typeWebhook?: TypeWebhook;
  timestamp?: number;
  idMessage?: string;
  senderData?: NotificationSenderData;
  messageData?: NotificationMessageData;
}

export interface IncomingNotification {
  receiptId: number;
  body: NotificationBody;
}
