import { DateTime } from 'luxon';

/**
 * Returns a capital-cased text
 * @param {string} str mixed case text
 * @returns {string}
 */
export function toCapitalizeCase(str) {
  if (typeof str !== 'string') return str;
  return str
    .trim()
    .split(/\s+/)
    .map(chunk => chunk[0].toUpperCase() + chunk.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Returns a formatted datetime
 * @param {string} datetime ISO8601 datetime
 * @returns {string}
 */
export function toDateFormat(datetime) {
  return DateTime.fromISO(datetime).toLocaleString(DateTime.DATETIME_SHORT);
}
