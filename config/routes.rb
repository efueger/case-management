Rails.application.routes.draw do
  root 'dashboard#index'

  get 'clients/index'
  get 'family_finding/index'

  namespace :api, defaults: {format: 'json'} do
    resources :addresses, only: [ :index ] do
      collection do
        get ':client_id', to: 'addresses#address_by_client'
      end
    end

    resources :clients, only: [ :show ] do
    end

    resources :cases, only: [ :index ] do
      collection do
        get ':user_id', to: 'cases#cases_by_user'
      end
    end

    resources :relationships, only: [ :index ] do
      collection do
        get ':id', to: 'relationships#relationships_by_client'
      end      
    end

    resources :referrals, only: [ :index ] do
      collection do
        get ':user_id', to: 'referrals#referrals_by_user'
      end
    end
  end
end
