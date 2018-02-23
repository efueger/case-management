# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module ChildClients
  describe IndianAncestory do
    describe 'attributes' do
      subject { IndianAncestory }
      it { is_expected.to have_attribute(:id, Types::String.optional) }
      it { is_expected.to have_attribute(:child_client_id, Types::String.optional) }
      it { is_expected.to have_attribute(:county_code, Types::String.optional) }
      it { is_expected.to have_attribute(:notification_date, Types::String.optional) }
    end
  end
end
