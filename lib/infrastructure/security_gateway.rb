# frozen_string_literal: true

module Infrastructure
  class SecurityGateway
    def valid_token?(token)
      response = Faraday.get(validation_url(token))
      response.body if response.status == 200
    end

    private

    def validation_url(token)
      perry_api_base_url = ENV.fetch('PERRY_API_BASE_URL')
      "#{perry_api_base_url}/authn/validate?token=#{token}"
    end
  end
end
