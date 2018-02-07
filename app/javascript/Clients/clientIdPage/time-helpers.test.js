import { timeSince, toMostSignificantTimeUnit } from './time-helpers';
import { Interval, DateTime } from 'luxon';

describe('timeSince', () => {
  it('returns interval in different values', () => {
    const { years } = timeSince(
      '2000-01-01',
      ['years'],
      new Date('2000-01-01T00:00:00.000-08:00')
    );
    expect(years).toEqual(0);
  });

  it('determines interval to now by default', () => {
    const interval = { count: jest.fn() };
    jest
      .spyOn(Interval, 'fromDateTimes')
      .mockImplementationOnce(() => interval);
    jest.spyOn(DateTime, 'fromISO').mockReturnValueOnce('FROM');
    jest.spyOn(DateTime, 'fromJSDate').mockReturnValueOnce('NOW');
    timeSince('2000-01-01');
    expect(DateTime.fromJSDate.mock.calls[0][0] instanceof Date).toBe(true);
    expect(DateTime.fromISO).toHaveBeenCalledWith('2000-01-01');
    expect(Interval.fromDateTimes).toHaveBeenCalledTimes(1);
  });

  it('returns interval in days, months, and years by default', () => {
    const { days, months, years } = timeSince('2000-01-01');
    expect(days).toEqual(jasmine.any(Number));
    expect(months).toEqual(jasmine.any(Number));
    expect(years).toEqual(jasmine.any(Number));
  });
});

describe('toTimeUnitLargestDenomination', () => {
  it('returns value in years', () => {
    const interval = { years: 1, months: 12, days: 365 };
    const { unit, value } = toMostSignificantTimeUnit(interval);
    expect(unit).toBe('years');
    expect(value).toBe(1);
  });

  it('returns value in months', () => {
    const interval = { years: 0, months: 11, days: 365 };
    const { unit, value } = toMostSignificantTimeUnit(interval);
    expect(unit).toBe('months');
    expect(value).toBe(11);
  });

  it('handles empty OK', () => {
    expect(toMostSignificantTimeUnit({})).toBeFalsy();
  });
});
