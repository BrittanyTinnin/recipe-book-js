Rails.application.routes.draw do

  root 'welcome#index'

  get '/signup', to: 'users#new', as: 'signup'

  get '/login', to: 'sessions#new', as: 'login'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy', as: 'logout'

  get '/auth/facebook/callback' => 'sessions#create'

  get '/recipes/order_by_name', to: 'recipes#name'


  resources :quantities
  resources :ingredients
  resources :recipes, only: [:index]

  resources :users, only: [:new, :create] do
    resources :recipes, only: [:new, :create, :show, :edit, :edit, :update ]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
