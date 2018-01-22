import { toCapitalizeCase, toDateFormat } from './formatters';
import { DateTime } from 'luxon';

describe('formatters', () => {
  describe('toCapitalizeCase()', () => {
    it('returns a capitalized string', () => {
      expect(toCapitalizeCase('HELLO')).toEqual('Hello');
    });

    it('handles non-string arguments', () => {
      const inputs = [{ a: 1 }, false, [], 'FOO BAR'];
      expect(toCapitalizeCase(inputs[0])).toBe(inputs[0]);
      expect(toCapitalizeCase(inputs[1])).toBe(inputs[1]);
      expect(toCapitalizeCase(inputs[2])).toBe(inputs[2]);
      expect(toCapitalizeCase(inputs[3])).not.toBe(inputs[3]);
    });

    it('handles extra whitespace', () => {
      expect(toCapitalizeCase('   before')).toEqual('Before');
      expect(toCapitalizeCase('AFTER    ')).toEqual('After');
      expect(toCapitalizeCase('IN   BETWEEN')).toEqual('In Between');
    });
  });

  describe('toDateFormat()', () => {
    it('is a function', () => {
      expect(toDateFormat).toEqual(jasmine.any(Function));
    });

    it('applied DateTime#fromISO to datetime', () => {
      const toLocaleString = jest.fn();
      const spyFromISO = jest
        .spyOn(DateTime, 'fromISO')
        .mockImplementation(() => ({ toLocaleString }));
      expect(spyFromISO).not.toHaveBeenCalled();
      toDateFormat('1941-12-07');
      expect(spyFromISO).toHaveBeenCalledWith('1941-12-07');
      expect(toLocaleString).toHaveBeenCalledWith(DateTime.DATETIME_SHORT);
    });
  });
});
