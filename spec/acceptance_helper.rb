# frozen_string_literal

require 'capybara'
require 'capybara/rspec'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.javascript_driver = :chrome

Capybara.configure do |config|
  config.default_max_wait_time = 10
  config.default_driver = :selenium
  config.app_host = ENV.fetch('CASE_WEB_BASE_URL', 'http://localhost:3000')
end
