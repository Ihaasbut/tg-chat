import parsePhoneNumber, { AsYouType } from "libphonenumber-js";

import { searchPanel } from "./SearchPanel.consts";

const maxPhoneDigits = 15;

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, maxPhoneDigits);

  if (!digits) {
    return "";
  }

  return new AsYouType().input(`+${digits}`).replace(/^\+/, "");
}

function isValidPhone(value: string) {
  return Boolean(parsePhoneNumber(`+${value}`)?.isPossible());
}

export function checkPhone(phoneNumber: string) {
  if (!isValidPhone(phoneNumber)) {
    return searchPanel.invalidPhone;
  }

  return true;
}
