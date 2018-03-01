import { getAgeUtil } from './getAgeFormat';
import moment from 'moment';

describe('getAgeUtil()', () => {
  var currentDate = moment();
  describe('When the age is 1 year', () => {
    it('should return ageUnitSelection as Y', () => {
      var pastYear = moment(currentDate).subtract(1, 'year');
      expect(getAgeUtil(pastYear).age).toBe(1);
      expect(getAgeUtil(pastYear).ageUnitSelection).toBe('Y');
    });
  });

  describe('when the age is one month', () => {
    it('should return age as 1 & ageUnitSelection as M', () => {
      var pastMonth = moment(currentDate).subtract(1, 'month');
      expect(getAgeUtil(pastMonth).age).toBe(1);
      expect(getAgeUtil(pastMonth).ageUnitSelection).toBe('M');
    });
  });

  describe('when 1 month between short month dates like 2/28 to 3/29', () => {
    it('returns 1 month', () => {
      const february = moment('2005-02-28');
      expect(getAgeUtil(february, moment('2005-03-29')).age).toBe(1);
    });
  });

  describe('when less than 1 month between short month dates like 2/28 to 3/27', () => {
    it('returns days', () => {
      const february = moment('2005-02-28');
      expect(getAgeUtil(february, moment('2005-03-27')).age).toBe(27);
    });
  });

  describe('when the age is one day', () => {
    it('should return age as 1 & ageUnitSelection as D', () => {
      var pastDay = moment(currentDate).subtract(1, 'day');
      expect(getAgeUtil(pastDay).age).toBe(1);
      expect(getAgeUtil(pastDay).ageUnitSelection).toBe('D');
    });
  });

  describe('when the dob is invalid', () => {
    it('should return age & ageUnitSelection as empty string', () => {
      var futureYear = moment(currentDate).add(2, 'year');
      expect(getAgeUtil(futureYear).age).toBe('');
      expect(getAgeUtil(futureYear).ageUnitSelection).toBe('');
    });
  });
});
