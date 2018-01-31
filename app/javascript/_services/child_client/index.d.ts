export = ChildClientService;
declare class ChildClientService {
  static fetch(): Promise<ChildClientService.Client[]>;
}

declare namespace ChildClientService {
  export interface ChildClient {
    prefix?: string;
    common_first_name?: string;
    common_middle_name?: string;
    common_last_name?: string;
    suffix_title_description?: string;
    social_security_number?: string;
    birth_dt?: string;
    adopted_age?: string;
    identifier?: string;
    alien_registration_number?: string;
    driver_license_number?: string;
    gender_code?: string;
    material_status_type?: string;
    ageUnit?: string;
    name_type?: string;
    driver_license_state_code_type?: string;
    primary_language_type?: string;
    secondary_language_type?: string;
    litrate_code?: string;
    incapacitated_parent_code?: string;
  }
}
