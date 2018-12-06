Rails.application.routes.draw do

  root 'welcome#index'

  get '/signup', to: 'users#new', as: 'signup'

  get '/login', to: 'sessions#new', as: 'login'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy', as: 'logout'

  get '/auth/facebook/callback' => 'sessions#create'

  get '/recipes/order_by_name', to: 'recipes#name'
  get '/users/:id/recipes/order_by_name', to: 'recipes#myname', as: 'ordered'


  resources :quantities
  resources :ingredients
  resources :recipes

  resources :users, only: [:new, :create, :show] do
    resources :recipes, only: [:index, :new, :create, :show, :edit, :update, :destroy]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
