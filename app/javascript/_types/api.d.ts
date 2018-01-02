declare namespace CWDS {
  export interface CaseResponse {
    /**
     * CASE.ID - The system generated unique identifier for each CASE. Although each CASE can be uniquely identified by a CLIENT and the CASE Start Date, an ID will allow STAFF_PERSONs to quickly reference existing CASEs. It will also help preserve confidentiality by not making it necessary to reference a child's name to identify a CASE. This ID has an internal 10 digit alpha-numeric representation and an external 19 digit numeric representation. The external representation is displayed at the User Interface or on Reports and Documents in the following format: 1234-1234-1234-1234567. The inclusion of the hyphens used in the formatting of this string results in a 22 byte display area. This ID is composed of the concatenation of a Creation Timestamp and the STAFF_PERSON ID. This value eliminates the need for an additional set of Creation Timestamp and Creation User ID which is needed to satisfy the Audit Trail requirement. The Creation Timestamp is a 'bit-shifted' timestamp representation which provides up to 1/100 of a second time granularity. The Timestamp uses a two digit internal year representation. An algorithm which generates a user displayable Timestamp value is provided which generates the century based upon the year value. When the year is less than 55, a value of 2000 is added, otherwise a value of 1900 is added as the century. The STAFF_PERSON ID is a sequential 3 digit base 62 number generated by the system. The STAFF_PERSON ID (3 bytes) is appended to the 7 digit internal timestamp value to provide the final 10 byte result.
     */
    identifier?: string;
    /**
     * CASE.NAME - The name which can be used for easy retrieval of a CASE instead of the ID. This will be defaulted to the focus CLIENT's (e.g., Case Child) Name (last, first) upon opening of a CASE.
     */
    case_name?: string;
    /**
     * CLIENT.ID - A system generated number used to uniquely identify each CLIENT. This ID has an internal 10 digit alpha-numeric representation[sic] and an external 19 digit numeric representation. The external representation is displayed at the User Interface or on Reports and Documents in the following format: 1234-1234-1234-1234567. The inclusion of the hyphens used in the formatting of this string results in a 22 byte display area. This ID is composed of the concatenation of a Creation Timestamp and the STAFF PERSON ID. This value eliminates the need for an additional set of Creation Timestamp and Creation User ID which is needed to satisfy the Audit Trail requirement. The Creation Timestamp is a 'bit-shifted' timestamp representation which provides up to 1/100 of a second time granularity. The Timestamp uses a two digit internal year representation. An algorithm which generates a user displayable Timestamp value is provided which generates the century based upon the year value. When the year is less than 55, a value of 2000 is added, otherwise a value of 1900 is added as the century. The Staff Person ID is a sequential 3 digit base 62 number generated by the system. The Staff Person ID (3 bytes) is appended to the 7 digit internal timestamp value to provide the final 10 byte result.
     */
    client_identifier?: string;
    /**
     * CLIENT.COMMON_FIRST_NAME - The first name commonly used to refer to a CLIENT. This is not necessarily the CLIENT's legal name, it is simply the name by which the CLIENT is referred to by family members, friends, and CWS staff.
     */
    client_first_name?: string;
    /**
     * CLIENT.COMMON_LAST_NAME - The last name commonly used to refer to a CLIENT. This is not necessarily the CLIENT's legal name, it is simply the name by which the CLIENT is referred to by family members, friends, and CWS staff.
     */
    client_last_name?: string;
    /**
     * CASE.ACTIVE_SERVICE_COMPONENT_TYPE - The system generated number assigned for each type of service component being referenced for a child's CASE (e.g., Emergency Response, Family Maintenance, Family Reunification, Permanent Placement).
     */
    active_service_component?: string;
    /**
     * ASSIGNMENT.TYPE_OF_ASSIGNMENT_CODE - This indicator specifies who has the lead role in carrying out the responsibilities of the CASE or REFERRAL. The primary assignment can be made to either the case working STAFF_PERSON or to an OUT_OF_STATE_CONTACT_PARTY. There may be many ASSIGNMENTs considered to be 'primary' over the life of the CASE or REFERRAL, but only one of them is current at any time. An ASSIGNMENT can be either designated as Primary (P), Secondary (S), or Read Only (R). Primary assigned workers have the capability to retrieve, read, and update any case or referral to which they have direct or indirect assignment. Similarly, Secondary assigned workers also have the same capabilities to retrieve, read, and update any case or referral to which they ave direct or indirect assignment. In fact, Secondary workers for the most part have the same capabilities as the Primary worker, but occasionally there are business rules in the application which prohibit the Secondary worker from doing something that the Primary worker can do (i.e. requesting the closure of an Adoptions Case). Read Only assigned workers have the capability to access and read any case or referral to which they have direct or indirect assignment, but they do not have update capability. = ['PRIMARY', 'SECONDARY', 'READ_ONLY
     */
    assignment_type?: string;
  }
  export interface ReferralResponse {
    /**
     * ID - A system generated number used to uniquely identify each Referral. This ID has an internal 10 digit alpha-numeric and an external 19 digit numeric representation.
     */
    identifier: string;
    /**
     * ADDITIONAL_INFO_INCLUDED_CODE - Indicates that additional obtained information invalidates the allegation. This attribute is part of the ER Protocol.
     */
    additional_info_included_code: boolean;
    /**
     * ANONYMOUS_REPORTER_IND - Indicates whether the REPORTER refuses to identify him/herself. If yes, no REPORTER (e.g., name, address, etc.) is recorded.
     */
    anonymous_reporter_indicator: boolean;
    /**
     * APPLICATION_FOR_PETITION_IND - This indicates whether the REFERRAL was generated as a result of an Application for Petition. If so, the corresponding Feedback Required Code attribute value from the REPORTER entity type should be set to 'Y'
     */
    application_for_petition_indicator: boolean;
    /**
     * APPROVAL_NUMBER - A non-unique number generated by the system when each Referral Response was submitted for approval for the first time. This number will be stored (uniquely) in this entity as a cross reference ID to the SUPERVISOR_APPROVAL entity.For example, when a particular Referral Response was submitted for approval the firsttime, an occurrence of SUPERVISOR_APPROVAL will be created with the Approval Number of '100'. This number will also be stored in the REFERRAL entity for this particular instance. When the supervisor disapproves this request due to further work required, the social worker may re-submit this request after modification. At that time, another occurrence of SUPERVISOR_APPROVAL will be generated with this same number '100'. Based on the action taken by the supervisor, the request may need to be re-submitted and new occurrences created with the same number '100' for the SUPERVISOR_APPROVAL over and over again, until the final Approval Status is set to 'Approved' on the REFERRAL entity. This is a physical implementation, which will save storage space over a logical implementation, by not storing all the different columns of foreign keys (relationships to all entity types which requires approval) in the SUPERVISOR_APPROVAL entity type. In reality, only one of the total number of foreign keys in the SUPERVISOR_APPROVAL entity type will have a value, when the remaining columns will be blank. This number will be generated by the same routine which generates all IDs for other entity types in the CWS system.
     */
    approval_number?: string;
    /**
     * APPROVAL_STATUS_TYPE - The system generated number assigned to each type of status associated with the approval request (e.g. Pending Approval, Requires Modification, Rejected, etc). This status type can be set by either the social worker or the supervisor depending on the stage of approval process the request is in. For example, when the social worker submits the request for approval, the Approval Status Type will be changed to 'Pending Approval' from 'Request Not Submitted', at which point no social worker modification can be made to the object submitted for approval. If the supervisor disapproves the request due to further work required, the Approval Status Type will then be changed to 'Modification Required'. The social worker may then modify the object before re-submission.
     */
    approval_status_type: integer;
    /**
     * CARETAKERS_PERPETRATOR_CODE - Indicates screener believes that the caretaker was the perpetrator or provided perpetrator access to the child. This attribute is part of the ER Protocol.
     */
    caretakers_perpetrator_code: boolean;
    /**
     * CLOSURE_DATE - The date when the referral is considered closed. (e.g., when all allegations have had dispositions, and each referral client under 18 has had a recommendation for further (or no) services).
     */
    closure_date: string;
    /**
     * COMMUNICATION_METHOD_TYPE - The system generated number assigned to each means of communication between the CWS OFFICE and the REPORTER, or the method upon which CONTACT was made or attempted (e.g., written, telephone, or in-person).
     */
    communication_method_type: integer;
    /**
     * COUNTY_SPECIFIC_CODE - A code, with values between '01' and '58' or '99' that indicates which county has primary assignment responsibility for the CASE or REFERRAL that this row belongs to. The value for each county is identical to the Logical ID value for the county in the Government_Entity_Type code table.
     */
    county_specific_code: string;
    /**
     * CURRNT_LOC_OF_CHILDREN_TEXT - A short narrative describing the reporter's knowledge of the location(s) of the "at risk" children at the time of the report. This is the ID from the LONG TEXT entity type which uniquely identifies a specific occurrence of user defined text.
     */
    current_location_of_children?: string;
    /**
     * DRMS_ALLEGATION_DESCRIPTION_DOC - A description of the allegation(s) as provided by the REPORTER. This could include the date of the alleged incident(s) and where the incidents occurred if known by the REPORTER, and any COLLATERAL INDIVIDUALs who may have additional information. This is the ID from the DOCUMENT entity type which identifies a unique Document within DRMS.
     */
    drms_allegation_description_doc?: string;
    /**
     * DRMS_ER_REFERRAL_DOC - A report which is an organized listing of the REPORTER details, Victim CLIENT details, ALLEGATION details, History of Prior REFERRALs or CASEs, and the Screener's notes. This is the ID from the DOCUMENT entity type which identifies a unique Document within DRMS.
     */
    drms_er_referral_doc?: string;
    /**
     * DRMS_INVESTIGATION_DOC - A free form narrative describing the social, cultural, psychological and physical factors relevant to the endangerment, including a history of previous intervention by the CWS agency and its outcome; family strengths and skills; alternatives to removal of the child from the home; and whether appropriate services are available which could make removal of the child unnecessary. This can include the preliminary evaluation of risk following the use of a Risk Assessment Tool.This is the ID from the DOCUMENT entity type which identifies a unique Document within DRMS.
     */
    drms_investigation_doc?: string;
    /**
     * FAMILY_AWARENESS_IND - Regulatory requirement to indicate whether the reporter elieves the family is aware of the REFERRAL.
     */
    family_awareness_indicator: boolean;
    /**
     * FAMILY_REFUSED_SERVICES_IND - Indicates whether the family refused services forthe REFERRAL.
     */
    family_refused_services_indicator: boolean;
    /**
     * FILED_CRSS_RPT_WITH_LAW_ENF_IND - Indicates whether the reporting party has already filed a Suspected Child Abuse Report to LAW ENFORCEMENT, et. al., relieving the Child Welfare Department of its obligation to file that CROSS REPORT
     */
    filed_suspected_child_abuse_reportto_law_enforcement_indicator: boolean;
    /**
     * FIRST_EO_APPROVAL_DATE - The date the referral was first closed as Evaluated Out.
     */
    first_evaluated_out_approval_date?: string;
    /**
     * FKADDRS_T - Optional Foreign key that ALLEGES_ABUSE_OCCURRED_AT a ADDRESS.
     */
    alleges_abuse_occurred_at_address_id?: string;
    /**
     * FKADDRS_T - Optional Foreign key that ALLEGES_ABUSE_OCCURRED_AT a ADDRESS.
     */
    link_to_primary_referral_id?: string;
    /**
     * FKSTFPERS0 - Optional Foreign key that HAS_FIRST_RESPONSE_DETERMINED_BY a STAFF_PERSON.
     */
    first_response_determined_by_staff_person_id?: string;
    /**
     * FKSTFPERST - Mandatory Foreign key that HAS_AS_THE_PRIMARY_CONTACT a STAFF_PERSON.
     */
    primary_contact_staff_person_id: string;
    /**
     * GOVERNMENT_ENTITY_TYPE - The system generated number which represents the specific county (e.g., Alameda, Fresno, Merced, Sacramento, etc.) within the state of California to which a specific REFERRAL is assigned.
     */
    govt_entity_type: integer;
    /**
     * HOMELESS_INDICATOR - Indicates whether the REFERRAL's address is homeless.
     */
    homeless_indicator: boolean;
    /**
     * LEGAL_DEFINITION_CODE - Indicates that at least one allegation meets the legal definition of abuse. This attribute is part of the ER Protocol.
     */
    legal_definition_code: string;
    /**
     * LEGAL_RIGHTS_NOTICE_IND - Indicates that the parents/guardians of the REFERRAL children have been notified "Y" of their legal rights as recipients of child welfare services upon the determination that further services has been recommended for one or more of their children.
     */
    legal_rights_notice_indicator: boolean;
    /**
     * LIMITED_ACCESS_CODE - Indicates whether a REFERRAL is marked as sensitive (S), sealed (R), or no restriction (N). This will be used to determine the security access level.
     */
    limited_access_code?: string;
    /**
     * LIMITED_ACCESS_DATE - The date that a case or referral was marked sealed, sensitive or non-limited.
     */
    limited_access_date?: string;
    /**
     * LIMITED_ACCESS_DESC - General narrative text which records details of a case or referral which has been marked sealed, sensitive or non-limited.
     */
    limited_access_desc?: string;
    /**
     * LIMITED_ACCESS_GOVERNMENT_ENTITY_TYPE - The system generated number which represents the specific county (e.g. Sacramento, Yolo, Butte, etc) within the State of California of the logged in user that changed the Access Rights for Case/Referral. The selection choices will be provided by the Government Entity Type code table, therefore this attribute will store the SysId of the chosen value.
     */
    limited_access_govt_agency_type?: integer;
    /**
     * MANDATED_CROSS_RPT_RECEIVED_DATE - The date that a written Suspected Child Abuse Report (form SS8572) was received from a mandated REPORTER by the CWS agency.
     */
    mandated_cross_report_received_date?: string;
    /**
     * NAME - The name which can be used for easy retrieval of a REFERRAL instead of the ID.
     */
    referral_name: string;
    /**
     * OPEN_ADEQUATE_CASE_CODE - Indicates an open service case adequately addresses the problem described in the allegation. This attribute is part of the ER Protocol.
     */
    open_adequate_case_code: boolean;
    /**
     * ORIGINAL_CLOSURE_DATE - The original date this referral was closed. Subsequent closure of this referral will set the Closure Date in REFERRAL_REOPEN_HISTORY, instead of this attribute.
     */
    original_closure_date?: string;
    /**
     * RECEIVED_DATE - The date the reported incident (REFERRAL) was received by a STAFF PERSON. This will be defaulted to the system date.
     */
    received_date: string;
    /**
     * RECEIVED_TIME - The time of day the reported incident (REFERRAL) was received by a STAFF PERSON. This will be defaulted to the system tim
     */
    received_time: LocalTime;
    /**
     * REFERRAL_RESPONSE_TYPE - The system generated number which identifies the first determined response (e.g., immediate, 10 days, etc.) assigned to the REFERRAL.
     */
    referral_response_type: integer;
    /**
     * REFERRED_TO_RESOURCE_TYPE - The system generated number assigned to each type of public or private agency to which a REFERRAL can be referred when the REFERRAL is evaluated out (e.g., Adoption, Eating Disorders, Law Enforcement, Licensing, etc.).
     */
    referred_to_resource_type: integer;
    /**
     * RESPONSE_DETERMINATION_DATE - The date the screener assigns a specific response type to a REFERRAL.
     */
    response_determination_date?: string;
    /**
     * RESPONSE_DETERMINATION_TIME - The time of day when the screener assigns a specific response type to a REFERRAL.
     */
    response_determination_time: LocalTime;
    /**
     * RESPONSE_RATIONALE_TEXT - A narrative description of the reason for assigning a selected response type to a particular REFERRAL and is mandatory for an evaluated out response type. This is the ID from the LONG TEXT entity type which uniquely identifies a specific occurrence of user defined text.
     */
    response_rationale_text?: string;
    /**
     * RESPONSIBLE_AGENCY_CODE - This code represents the agency or department that is responsible for the REFERRAL. The valid values are County Welfare Department (C), Probation (P), Out of State Agency (O), Private Adoption Agency (A), State Adoption District Office (S), Indian Child Welfare (I), Kin-Gap (K), or Mental Health (M).
     */
    responsible_agency_code: string;
    /**
     * SCREENER_NOTE_TEXT - A narrative description related to this specific incident of abuse. This is the additional information that was not documented in the Allegation Description and is recorded here by the screener as additional details for the assigned worker. (e.g., the screener's assessment of the creditability of the REPORTER.) This is the ID from the LONG TEXT entity type which uniquely identifies a specific occurrence of user defined text.
     */
    screener_note_text?: string;
    /**
     * SPECIAL_PROJECT_REFERRAL_IND - This indicator variable is used to indicate if there are any occurrences of SPECIAL_PROJECTs related to this REFERRAL. This will save unnecessary processing time from searching for information that does not exist in the database.
     */
    special_project_referral_indicator: boolean;
    /**
     * SPECIFICS_INCLUDED_CODE - Indicates specific acts and/or behavior were included in allegation. This attribute is part of the ER Protocol.
     */
    specifics_included_code: boolean;
    /**
     * SUFFICIENT_INFORMATION_CODE - Indicates if there were sufficient information to locate the family. This attribute is part of the ER Protocol.
     */
    sufficient_information_code: boolean;
    /**
     * UNFOUNDED_SERIES_CODE - Indicates allegation is one in a series of previously investigated, non-substantiated reports from the same party with no new allegations made. This attribute is part of the ER Protocol.
     */
    unfounded_series_code: boolean;
    /**
     * ZIPPY_CREATED_IND - Indicates whether or not this REFERRAL was created from within the Zippy Referral notebook as opposed to the traditional REFERRAL notebook.
     */
    zippy_created_indicator: boolean;
    /**
     * Assignment Type
     */
    assignment_type?: 'PRIMARY' | 'SECONDARY' | 'READ_ONLY';
  }
}
