# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module ChildClients
  describe ChildClient do
    describe 'attributes' do
      subject { ChildClient }
      it { is_expected.to have_attribute(:name_prefix_description, Types::String.optional) }
      it { is_expected.to have_attribute(:common_first_name, Types::String.optional) }
      it { is_expected.to have_attribute(:common_middle_name, Types::String.optional) }
      it { is_expected.to have_attribute(:common_last_name, Types::String.optional) }
      it { is_expected.to have_attribute(:suffix_title_description, Types::String.optional) }
      it { is_expected.to have_attribute(:social_security_number, Types::String.optional) }
      it { is_expected.to have_attribute(:birth_dt, Types::String.optional) }
      it { is_expected.to have_attribute(:identifier, Types::String.optional) }
      it { is_expected.to have_attribute(:alien_registration_number, Types::String.optional) }
      it { is_expected.to have_attribute(:driver_licens_number, Types::String.optional) }
      it { is_expected.to have_attribute(:driver_license_state_code_type, Types::String.optional) }
      it { is_expected.to have_attribute(:gender_code, Types::String.optional) }
      it { is_expected.to have_attribute(:material_status_type, Types::String.optional) }
      it { is_expected.to have_attribute(:name_type, Types::String.optional) }
      it { is_expected.to have_attribute(:driver_license_state_code_type, Types::String.optional) }
      it { is_expected.to have_attribute(:primary_language_type, Types::String.optional) }
      it { is_expected.to have_attribute(:secondary_language_type, Types::String.optional) }
      it { is_expected.to have_attribute(:litrate_code, Types::String.optional) }
      it { is_expected.to have_attribute(:incapacitated_parent_code, Types::String.optional) }
      it { is_expected.to have_attribute(:marital_cohabitatn_indicator, Types::String.optional) }
      it { is_expected.to have_attribute(:military_status_code, Types::String.optional) }
      it { is_expected.to have_attribute(:outstanding_warrant_indicator, Types::String.optional) }
      it { is_expected.to have_attribute(:primary_ethnicity_type, Types::String.optional) }
      it { is_expected.to have_attribute(:religion_type, Types::String.optional) }
      it {
        is_expected
          .to have_attribute(:sensivity_health_info_on_file_indicator, Types::String.optional)
      }
      it {
        is_expected.to have_attribute(:social_security_number_changed_code, Types::String.optional)
      }
      it { is_expected.to have_attribute(:unemployed_parent_code, Types::String.optional) }
      it { is_expected.to have_attribute(:comment_description, Types::String.optional) }
      it { is_expected.to have_attribute(:estimated_dob_code, Types::String.optional) }
      it { is_expected.to have_attribute(:birthplace_verified_indicator, Types::String.optional) }
      it { is_expected.to have_attribute(:hispanic_origin_code, Types::String.optional) }
      it { is_expected.to have_attribute(:children_serv_indicator, Types::String.optional) }
      it {
        is_expected.to have_attribute(:currently_regional_centeer_indicator, Types::String.optional)
      }
      it { is_expected.to have_attribute(:currently_other_description, Types::String.optional) }
      it { is_expected.to have_attribute(:previously_received_indicator, Types::String.optional) }
      it {
        is_expected.to have_attribute(:previously_regional_center_indicator, Types::String.optional)
      }
      it { is_expected.to have_attribute(:previously_other_description, Types::String.optional) }
      it { is_expected.to have_attribute(:health_care_plan_indicator, Types::String.optional) }
      it {
        is_expected.to have_attribute(:limitation_on_scphealth_indicator, Types::String.optional)
      }
      it { is_expected.to have_attribute(:birth_city, Types::String.optional) }
      it { is_expected.to have_attribute(:zippy_indicator, Types::String.optional) }
      it {
        is_expected.to have_attribute(:tribal_member_verification_indicator, Types::String.optional)
      }
      it {
        is_expected.to have_attribute(:tribal_ancestry_client_indicator, Types::String.optional)
      }
      it { is_expected.to have_attribute(:soc158_ind, Types::String.optional) }
      it { is_expected.to have_attribute(:death_date_verified_indicator, Types::String.optional) }
      it { is_expected.to have_attribute(:soc158_placement_code, Types::String.optional) }
      it { is_expected.to have_attribute(:victim_client_id, Types::String.optional) }
      it { is_expected.to have_attribute(:adoptable_code, Types::String.optional) }
      it { is_expected.to have_attribute(:adopted_age, Types::String.optional) }
      it {
        is_expected.to have_attribute(:afdc_fc_eligibility_indicator_var, Types::String.optional)
      }
      it {
        is_expected.to have_attribute(:all_education_info_on_file_indicator, Types::String.optional)
      }
      it {
        is_expected.to have_attribute(:all_health_info_on_file_indicator, Types::String.optional)
      }
      it {
        is_expected.to have_attribute(:attempt_to_acquire_educ_info_desc, Types::String.optional)
      }
      it { is_expected.to have_attribute(:awol_abducted_code, Types::String.optional) }
      it { is_expected.to have_attribute(:birth_history_indicator_var, Types::String.optional) }
      it { is_expected.to have_attribute(:child_indian_ancestry_indicator, Types::String.optional) }
      it { is_expected.to have_attribute(:current_case_id, Types::String.optional) }
      it { is_expected.to have_attribute(:death_circumstances_type, Types::String.optional) }
      it {
        is_expected.to have_attribute(:fc2_elig_application_indicator_var, Types::String.optional)
      }
      it {
        is_expected.to have_attribute(:food_stamps_application_indicator, Types::String.optional)
      }
      it { is_expected.to have_attribute(:icwa_eligibility_code, Types::String.optional) }
      it {
        is_expected
          .to have_attribute(:intercountry_adopt_disrupted_indicator, Types::String.optional)
      }
      it {
        is_expected
          .to have_attribute(:intercountry_adopt_dissolved_indicator, Types::String.optional)
      }
      it {
        is_expected
          .to have_attribute(:med_eligibility_application_indicator_var, Types::String.optional)
      }
      it { is_expected.to have_attribute(:minor_nmd_parent_indicator, Types::String.optional) }
      it {
        is_expected.to have_attribute(:parental_rights_limited_indicator, Types::String.optional)
      }
      it {
        is_expected
          .to have_attribute(:parental_rights_termintn_indicator_var, Types::String.optional)
      }
      it {
        is_expected.to have_attribute(:paternity_individual_indicator_var, Types::String.optional)
      }
      it { is_expected.to have_attribute(:previously_adopted, Types::String.optional) }
      it {
        is_expected
          .to have_attribute(:safely_surrended_babies_indicator_var, Types::String.optional)
      }
      it {
        is_expected.to have_attribute(:saw1_elig_application_indicator_var, Types::String.optional)
      }
      it { is_expected.to have_attribute(:saws_case_serial_number, Types::String.optional) }
      it { is_expected.to have_attribute(:ssi_ssp_application_indicator, Types::String.optional) }
      it {
        is_expected
          .to have_attribute(:tribal_ancestry_notifctn_indicator_var, Types::String.optional)
      }
      it {
        is_expected.to have_attribute(:tribal_customary_adoption_indicator, Types::String.optional)
      }
    end
  end
end
