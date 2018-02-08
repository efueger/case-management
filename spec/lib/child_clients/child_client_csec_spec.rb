# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module ChildClients
  describe ChildClientCsec do
    describe 'attributes' do
      subject { ChildClientCsec }
      it { is_expected.to have_attribute(:child_client_id, Types::String.optional) }
      it { is_expected.to have_attribute(:sexual_exploitation_type, Types::String.optional) }
      it { is_expected.to have_attribute(:start_date, Types::String.optional) }
      it { is_expected.to have_attribute(:end_date, Types::String.optional) }
    end
  end
end
