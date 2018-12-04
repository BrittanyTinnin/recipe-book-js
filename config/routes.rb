Rails.application.routes.draw do



  resources :quantities
  resources :ingredients

  resources :users do
    resources :recipes
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
