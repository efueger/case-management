# frozen_string_literal: true

module Infrastructure
  class HttpService
    def initialize(base_url = ENV.fetch('CASE_API_BASE_URL', 'https://casemgmapi.test.cwds.io'))
      @base_url = base_url
    end

    def get(url)
      connection = Faraday.new(url: @base_url) do |conn|
        conn.response :json, parser_options: { symbolize_names: true }
        conn.adapter Faraday.default_adapter
      end
      connection.get(url)
    end
  end
end
