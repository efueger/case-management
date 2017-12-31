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
  export interface ReferralResponse {
    identifier: string;
    additional_info_included_code: boolean;
    anonymous_reporter_indicator: boolean;
    application_for_petition_indicator: boolean;
    approval_number?: string;
    approval_status_type: integer;
    caretakers_perpetrator_code: boolean;
    closure_date: string;
    communication_method_type: integer;
    county_specific_code: string;
    current_location_of_children?: string;
    drms_allegation_description_doc?: string;
    drms_er_referral_doc?: string;
    drms_investigation_doc?: string;
    family_awareness_indicator?: boolean;
    family_refused_services_indicator: boolean;
    filed_suspected_child_abuse_reportto_law_enforcement_indicator: boolean;
    first_evaluated_out_approval_date?: string;
    alleges_abuse_occurred_at_address_id?: string;
    link_to_primary_referral_id?: string;
    first_response_determined_by_staff_person_id?: string;
    primary_contact_staff_person_id: string;
    govt_entity_type: integer;
    homeless_indicator: boolean;
    legal_definition_code: string;
    legal_rights_notice_indicator: boolean;
    limited_access_code?: string;
    limited_access_date?: string;
    limited_access_desc?: string;
    limited_access_govt_agency_type?: integer;
    mandated_cross_report_received_date?: string;
    referral_name: string;
    open_adequate_case_code: boolean;
    original_closure_date?: string;
    received_date: string;
    received_time: LocalTime;
    referral_response_type: integer;
    referred_to_resource_type: integer;
    response_determination_date?: string;
    response_determination_time: LocalTime;
    response_rationale_text?: string;
    responsible_agency_code: string;
    screener_note_text?: string;
    special_project_referral_indicator: boolean;
    specifics_included_code: boolean;
    sufficient_information_code: boolean;
    unfounded_series_code: boolean;
    zippy_created_indicator: boolean;
    assignment_type?: string;
  }
}
