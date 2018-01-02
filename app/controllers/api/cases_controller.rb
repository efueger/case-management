# frozen_string_literal: true

module Api
  class CasesController < ActionController::API

    def cases_by_user
      conn = Faraday.new(:url => 'http://case-api:8080') do |faraday|
        faraday.adapter  Faraday.default_adapter
      end

      res = conn.get do |req|
        req.url "/staff/#{params[:user_id]}/cases"
        req.headers['Accept'] = 'application/json'
      end

      render json: res.body
    end

    def cases_by_user_OLD
      cases = names.map.with_index do |name, index|
        create_case(index + 1, name)
      end
      render json: cases
    end

    private

    def names
      %w[Alice Bob Carl Dave Earl Frank Gregg Henry Ivan Johnny]
    end

    def create_case(id, name)
      { id: id.to_s, name: name, assignmentType: 'primary',
        assignmentDate: '2017-12-25', serviceComponent: 'Family Maintenance' }
    end
  end
end
