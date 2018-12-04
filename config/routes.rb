Rails.application.routes.draw do

  root 'welcome#index'

  get '/signup', to: 'users#new', as: 'signup'

  get '/login', to: 'sessions#new', as: 'login'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy', as: 'logout'


  resources :quantities
  resources :ingredients

  resources :users do
    resources :recipes
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
