import type { GreenApiInstance } from "@/utils/instance";

import { authForm } from "./AuthForm.consts";

function isValidApiUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function checkInstance(instance: GreenApiInstance) {
  if (!isValidApiUrl(instance.apiUrl)) {
    return authForm.invalidApiUrl;
  }

  if (!instance.idInstance || !instance.apiTokenInstance) {
    return authForm.missingCredentials;
  }

  return true;
}
