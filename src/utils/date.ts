import "dayjs/locale/ru";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.locale("ru");

export function formatTime(timestamp: number) {
  return dayjs(timestamp).format("HH:mm");
}

export function formatDateTime(timestamp: number) {
  return dayjs(timestamp).format("LLL");
}
