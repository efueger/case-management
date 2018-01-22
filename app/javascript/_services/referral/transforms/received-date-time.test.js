import { joinReceiveDateTime } from './received-date-time';
import { DateTime } from 'luxon';

describe('joinReceiveDateTime', () => {
  it('is a function', () => {
    expect(joinReceiveDateTime).toEqual(jasmine.any(Function));
  });

  it('replaces `received_date` and `received_time` with `received_datetime`', () => {
    DateTime.fromISO = jest.fn(() => ({ toISO: () => {} }));
    joinReceiveDateTime({
      received_date: 'SOME_DATE',
      received_time: 'SOME_TIME',
    });
    expect(DateTime.fromISO).toHaveBeenCalledWith('SOME_DATETSOME_TIME');
  });

  it('conditionally includes `received_time`', () => {
    DateTime.fromISO = jest.fn(() => ({ toISO: () => {} }));
    joinReceiveDateTime({ received_date: 'SOME_DATE' });
    expect(DateTime.fromISO).toHaveBeenCalledWith('SOME_DATE');
  });
});
