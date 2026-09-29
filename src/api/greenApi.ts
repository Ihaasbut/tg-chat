import type { GreenApiInstance } from "@/utils/instance";

import type {
  CheckAccountResponse,
  DeleteNotificationResponse,
  GreenApiError,
  IncomingNotification,
  SendMessageResponse,
} from "./greenApi.types";

export function getErrorText(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Произошла неизвестная ошибка. Попробуйте ещё раз.";
}

function buildMethodUrl(
  instance: GreenApiInstance,
  method: string,
  suffix = "",
) {
  const apiUrl = instance.apiUrl.trim().replace(/\/+$/, "");
  const idInstance = encodeURIComponent(instance.idInstance.trim());
  const token = encodeURIComponent(instance.apiTokenInstance.trim());

  return `${apiUrl}/waInstance${idInstance}/${method}/${token}${suffix}`;
}

function getErrorMessage(data: GreenApiError | null, fallback: string) {
  return data?.data?.reason ?? data?.reason ?? data?.message ?? fallback;
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, init);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new Error(
      "Не удалось связаться с GREEN-API. Проверьте адрес API и подключение к интернету.",
      { cause: error },
    );
  }

  const responseText = await response.text();
  let data: T | GreenApiError | null = null;

  if (responseText) {
    try {
      data = JSON.parse(responseText) as T | GreenApiError;
    } catch {
      throw new Error("GREEN-API вернул ответ в неизвестном формате.");
    }
  }

  if (!response.ok) {
    throw new Error(
      getErrorMessage(
        data as GreenApiError | null,
        `Ошибка GREEN-API (${response.status})`,
      ),
    );
  }

  return data as T;
}

export async function checkAccount(
  instance: GreenApiInstance,
  phoneNumber: string,
) {
  const result = await requestJson<CheckAccountResponse | GreenApiError>(
    buildMethodUrl(instance, "checkAccount"),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: Number(phoneNumber) }),
    },
  );

  if ("status" in result && result.status === false) {
    throw new Error(getErrorMessage(result, "Не удалось проверить номер."));
  }

  return result as CheckAccountResponse;
}

export function sendMessage(
  instance: GreenApiInstance,
  chatId: string,
  message: string,
) {
  return requestJson<SendMessageResponse>(
    buildMethodUrl(instance, "sendMessage"),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, message }),
    },
  );
}

export function receiveNotification(
  instance: GreenApiInstance,
  signal: AbortSignal,
) {
  return requestJson<IncomingNotification | null>(
    buildMethodUrl(instance, "receiveNotification", "?receiveTimeout=5"),
    { signal },
  );
}

export function deleteNotification(
  instance: GreenApiInstance,
  receiptId: number,
  signal?: AbortSignal,
) {
  return requestJson<DeleteNotificationResponse>(
    buildMethodUrl(
      instance,
      "deleteNotification",
      `/${encodeURIComponent(receiptId)}`,
    ),
    { method: "DELETE", signal },
  );
}
