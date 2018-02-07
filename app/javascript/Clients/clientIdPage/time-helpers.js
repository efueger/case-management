import { Interval, DateTime } from 'luxon';

export function timeSince(
  isoDate,
  units = ['days', 'months', 'years'],
  now = new Date()
) {
  return intervalUnits(
    Interval.fromDateTimes(DateTime.fromISO(isoDate), DateTime.fromJSDate(now)),
    units
  );
}

function intervalUnits(interval, units) {
  return units.reduce(
    (accumulator, unit) => ({
      ...accumulator,
      [unit]: interval.count(unit) - 1, // intervals are half-open
    }),
    {}
  );
}

export function toMostSignificantTimeUnit(
  interval,
  bins = ['years', 'months', 'days']
) {
  for (const unit of bins) {
    if (interval[unit] > 0) return { unit: unit, value: interval[unit] };
  }
}
