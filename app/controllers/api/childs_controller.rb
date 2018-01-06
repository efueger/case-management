
module Api
    class ChildsController < ActionController::API
      def cases_by_user
        clients = Child::ChildRepository.new.child_by_user_id params[:user_id]
        render json: clients
      end
    end
  end
  