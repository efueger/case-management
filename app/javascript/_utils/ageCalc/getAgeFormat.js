import moment from 'moment';
var age = '';
var ageUnitSelection = '';
export function getAgeUtil(birthDate) {
  let dob = moment(birthDate);
  let months = moment().diff(dob, 'months');
  let years = moment().diff(dob, 'years');
  let days = moment().diff(dob, 'days');

  if (days >= 1 && days < 31) return getDays(days);
  if (months >= 1 && months < 11) return getMonths(months);
  if (years >= 1) return getYears(years);
  if (days <= 0 || months <= 0 || years <= 0) {
    return { age: '', ageUnitSelection: '' };
  }
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
