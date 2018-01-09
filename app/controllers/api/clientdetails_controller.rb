module Api
    class ClientdetailsController < ActionController::API
      def show 
      end 
      def clientdetails_by_user
        clientdetails = Clientdetails::ClientdetailsRepository.new.clientdetails_by_user_id params[:user_id]
        render json: clientdetails
      end
    end
end