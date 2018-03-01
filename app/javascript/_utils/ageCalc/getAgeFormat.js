import moment from 'moment';
var age = '';
var ageUnitSelection = '';
export function getAgeUtil(birthDate, now = moment()) {
  let dob = moment(birthDate);
  let months = now.diff(dob, 'months');
  let years = now.diff(dob, 'years');
  let days = now.diff(dob, 'days');

  if (years >= 1) return getYears(years);
  if (months >= 1 && months < 11) return getMonths(months);
  if (days >= 1) return getDays(days);
  return { age: '', ageUnitSelection: '' };
}

function getYears(years) {
  age = years;
  if (years >= 1) {
    ageUnitSelection = 'Y';
  }
  return { age, ageUnitSelection };
}

function getMonths(months) {
  age = months;
  if (months >= 1) {
    ageUnitSelection = 'M';
  }
  return { age, ageUnitSelection };
}
function getDays(days) {
  age = days;
  if (days >= 1) {
    ageUnitSelection = 'D';
  }
  return { age, ageUnitSelection };
}
