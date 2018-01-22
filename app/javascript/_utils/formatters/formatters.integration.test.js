import { toDateFormat } from './formatters';

describe('formatters', () => {
  describe('toDateFormat()', () => {
    it('returns a short date time', () => {
      expect(toDateFormat('1941-12-07T12:00:00')).toEqual('1941-12-7 12:00');
    });
  });
});
