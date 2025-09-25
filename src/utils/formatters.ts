import moment from "moment-timezone";

export const formatTimestamp = (
  date: Date,
  timezone: string,
  timestampFormat: string
) => {
  return moment(date).tz(timezone).format(timestampFormat);
};
