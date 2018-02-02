Rails.application.routes.draw do
  root 'dashboard#index'

  get 'clients/index'
  get 'family_finding/index'

  namespace :api, defaults: {format: 'json'} do
    resources :clients, only: [ :show ] do
    end

    resources :child_clients, only: [ :show ] do
    end

    resources :cases, only: [ :index ] do
      collection do
        get ':user_id', to: 'cases#cases_by_user'
      end
    end

    resources :placements, only: [] do
      collection do
        get ':client_id', to: 'placements#clients_by_related_client_id'
      end
    end

    resources :referrals, only: [ :index ] do
      collection do
        get ':user_id', to: 'referrals#referrals_by_user'
      end
    end
  end
end
