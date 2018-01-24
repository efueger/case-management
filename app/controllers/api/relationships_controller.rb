# frozen_string_literal: true

module Api
  class RelationshipsController < ActionController::API
    def relationships_by_client
      relationships = Relationships::RelationshipRepository.new.get_id(params[:id], session[:token])
      render json: relationships
    end
  end
end
