import { transformCase, transformReferral } from './transforms';

describe('DashboardContainer Transforms', () => {
  describe('transformCase', () => {
    it('transforms case api response to view model', () => {
      const out = transformCase({
        identifier: 'id',
        case_name: 'name',
        assignment_type: 'assignment_type',
        active_service_component: 'active_service_component',
      });
      expect(out.id).toBe('id');
      expect(out.name).toBe('name');
      expect(out.serviceComponent).toBe('active_service_component');
    });
  });

  describe('transformReferral', () => {
    it('transforms referral api response to view model', () => {
      const out = transformReferral({
        identifier: 'id',
        referral_name: 'name',
        assignment_type: 'assignmentType',
      });
      expect(out.id).toBe('id');
      expect(out.name).toBe('name');
      expect(out.assignmentType).toBe('assignmentType');
    });
  });
});
