Rails.application.routes.draw do
  root 'dashboard#index'

  get 'clients/index'
  get 'family_finding/index'

end
