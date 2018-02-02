# frozen_string_literal: true

module Infrastructure
  class HttpService
    def initialize(base_url = Rails.configuration.micro_services['case_api_base_url'])
      @base_url = base_url
    end

    def get(url, token)
      http_connection.get("#{url}?token=#{token}")
    end

    def post(url, parameters, token)
      http_connection.post("#{url}?token=#{token}", parameters)
    end

    private

    def http_connection
      Faraday.new(url: @base_url) do |connection|
        connection.response :json, parser_options: { symbolize_names: true }
        connection.adapter Faraday.default_adapter
      end
    end
  end
end
