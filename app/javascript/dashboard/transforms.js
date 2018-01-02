/**
 * @param {CWDS.CaseResponse} dirty
 * @returns {CWDS.CaseSummary}
 */
export function transformCase(dirty) {
  return {
    id: dirty.identifier,
    name: dirty.case_name,
    assignmentType: dirty.assignment_type,
    assignmentDate: '?',
    serviceComponent: dirty.active_service_component,
  };
}

/**
 * @param {CWDS.ReferralResponse} dirty
 * @returns {CWDS.CaseSummary}
 */
export function transformReferral(dirty) {
  return {
    id: dirty.identifier,
    name: dirty.referral_name,
    assignmentType: dirty.assignment_type,
  };
}
