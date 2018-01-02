# frozen_string_literal: true

module Api
  class CasesController < ActionController::API
    def cases_by_user
      conn = Faraday.new({ url => 'http://case-api:8080' }) do |faraday|
        faraday.adapter Faraday.default_adapter
      end

      res = conn.get do |req|
        req.url "/staff/#{params[:user_id]}/cases"
        req.headers['Accept'] = 'application/json'
      end

      render json: res.body
    end
  end
end
