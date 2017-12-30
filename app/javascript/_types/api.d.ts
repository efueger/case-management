declare namespace CWDS {
  export interface CaseResponse {
    identifier?: string;
    case_name?: string;
    client_identifier?: string;
    client_first_name?: string;
    client_last_name?: string;
    active_service_component?: string;
    assignment_type?: string;
  }
  export interface CaseSummary {
    id: string;
    name: string;
    assignmentType: string;
    assignmentDate: string;
    serviceComponent: string;
  }
}
