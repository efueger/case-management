# frozen_string_literal: true

require 'acceptance_helper'

feature'Landing Page' do
  scenario 'has some cases and referrals' do
    visit '/?token=example'
    page_has_cases
    page_has_referrals
  end

  private

  def page_has_cases
    expect(page).to have_content('Emergency Response')
  end

  def page_has_referrals
    expect(page).to have_content('Immediate')
  end
end
