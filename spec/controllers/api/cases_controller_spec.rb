# frozen_string_literal: true

require 'rails_helper'

module Api
  describe CasesController do
    describe '#cases_by_user' do
      let(:case_repository) { instance_double('Cases::CaseRepository') }
      let(:child_case) { Cases::Case.new(identifier: 77) }

      it 'has a route' do
        expect(get: 'api/cases/42').to route_to(
          controller: 'api/cases',
          action: 'cases_by_user',
          user_id: '42',
          format: 'json'
        )
      end

      it 'returns cases' do
        allow(Cases::CaseRepository).to receive(:new).with(no_args).and_return(case_repository)
        allow(case_repository).to receive(:cases_by_user_id)
          .with('42', 'token').and_return([child_case])
        request.session[:token] = 'token'
        get :cases_by_user, params: { user_id: 42 }

        expect(response.body).to eq [child_case].to_json
      end
    end
  end
end
