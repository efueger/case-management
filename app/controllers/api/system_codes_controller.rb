# frozen_string_literal: true

module Api
  class SystemCodesController < ActionController::API
    def show
      system_code = SystemCodes::SystemCodeRepository.new.show(params[:id], session[:token])
      render json: system_code
    end
  end
end
