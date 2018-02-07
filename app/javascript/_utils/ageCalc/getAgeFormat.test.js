import { getAgeUtil } from './getAgeFormat';
import moment from 'moment';

describe('getAgeUtil()', () => {
  it('is a function', () => {
    var currentDate = moment();
    var pastYear = moment(currentDate).subtract(1, 'year');
    expect(getAgeUtil(pastYear).age).toBe(1);
    expect(getAgeUtil(pastYear).ageUnitSelection).toBe('Y');

    var pastMonth = moment(currentDate).subtract(1, 'month');
    expect(getAgeUtil(pastMonth).age).toBe(1);
    expect(getAgeUtil(pastMonth).ageUnitSelection).toBe('M');

    var pastDay = moment(currentDate).subtract(1, 'day');
    expect(getAgeUtil(pastDay).age).toBe(1);
    expect(getAgeUtil(pastDay).ageUnitSelection).toBe('D');

    var pastYears = moment(currentDate).subtract(2, 'years');
    expect(getAgeUtil(pastYears).age).toBe(2);
    expect(getAgeUtil(pastYears).ageUnitSelection).toBe('Y');

    var pastMonths = moment(currentDate).subtract(2, 'months');
    expect(getAgeUtil(pastMonths).age).toBe(2);
    expect(getAgeUtil(pastMonths).ageUnitSelection).toBe('M');

    var pastDays = moment(currentDate).subtract(2, 'days');
    expect(getAgeUtil(pastDays).age).toBe(2);
    expect(getAgeUtil(pastDays).ageUnitSelection).toBe('D');

    var futureYear = moment(currentDate).add(2, 'year');
    expect(getAgeUtil(futureYear).age).toBe('');
    expect(getAgeUtil(futureYear).ageUnitSelection).toBe('');

    var futureMonth = moment(currentDate).add(1, 'month');
    expect(getAgeUtil(futureMonth).age).toBe('');
    expect(getAgeUtil(futureMonth).ageUnitSelection).toBe('');

    var futureDay = moment(currentDate).add(1, 'day');
    expect(getAgeUtil(futureDay).age).toBe('');
    expect(getAgeUtil(futureDay).ageUnitSelection).toBe('');

    var futureYears = moment(currentDate).add(2, 'years');
    expect(getAgeUtil(futureYears).age).toBe('');
    expect(getAgeUtil(futureYears).ageUnitSelection).toBe('');

    var futureMonths = moment(currentDate).add(2, 'months');
    expect(getAgeUtil(futureMonths).age).toBe('');
    expect(getAgeUtil(futureMonths).ageUnitSelection).toBe('');

    var futureDays = moment(currentDate).add(2, 'days');
    expect(getAgeUtil(futureDays).age).toBe('');
    expect(getAgeUtil(futureDays).ageUnitSelection).toBe('');
  });
});
