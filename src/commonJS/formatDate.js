import dayjs from "dayjs";

export const formatDateTime = (date) =>
  date ? dayjs(date).format("YYYY/MM/DD HH:mm") : "";
