import type { GreenApiInstance } from "@/utils/instance";

export const authForm = {
  apiUrlLabel: "Адрес API",
  apiUrlPlaceholder: "https://4100.api.green-api.com",
  idInstanceLabel: "ID инстанса",
  idInstancePlaceholder: "4100000000",
  apiTokenLabel: "API-токен",
  apiTokenPlaceholder: "Вставьте apiTokenInstance",
  submitLabel: "Открыть чат",
  invalidApiUrl: "Укажите корректный адрес API, начинающийся с https://",
  missingCredentials: "Заполните ID инстанса и API-токен.",
};

export const emptyInstance: GreenApiInstance = {
  apiUrl: "",
  idInstance: "",
  apiTokenInstance: "",
};
