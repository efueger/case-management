# frozen_string_literal: true

Rails.application.config.micro_services = {
  case_api_base_url: ENV.fetch('CASE_API_BASE_URL', 'https://case-api.test'),
  perry_api_base_url: ENV.fetch('PERRY_API_BASE_URL', 'https://perry-api.test'),
  geo_api_base_url: ENV.fetch('GEO_API_BASE_URL', 'http://geo-api.test')
}
