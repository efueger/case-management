import { DateTime } from 'luxon';

/* eslint-disable camelcase */
export function joinReceiveDateTime({
  received_date,
  received_time,
  ...attrs
}) {
  const received_datetime = DateTime.fromISO(
    `${received_date}${received_time ? 'T' + received_time : ''}`
  ).toISO();
  return {
    ...attrs,
    received_datetime,
  };
}
/* eslint-enable camelcase */
