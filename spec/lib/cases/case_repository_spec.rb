# frozen_string_literal: true

require 'spec_helper'

module Cases
  describe CaseRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:case_repository) { CaseRepository.new(http_service) }
    let(:token) { 'starcade_token' }

    describe '#cases_by_user' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no cases' do
        it 'returns an empty collection' do
          allow(response).to receive(:body).and_return([])
          allow(http_service)
            .to receive(:get)
            .with('/staff/12/cases', token)
            .and_return(response)
          expect(case_repository.cases_by_user_id('12', token)).to eq []
        end
      end

      context 'with cases' do
        it 'returns cases' do
          allow(response).to receive(:body).and_return([{ id: '12' }])
          allow(http_service).to receive(:get)
            .with('/staff/12/cases', token)
            .and_return(response)
          expect(case_repository.cases_by_user_id('12', token)).to eq [Case.new(id: '12')]
        end
      end
    end
  end
end
