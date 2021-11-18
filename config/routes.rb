Rails.application.routes.draw do

  get 'home/top'
  get 'welcome', to: 'welcome#index'
  root to: 'todos#index'
  resources :todos, only: [:index, :new, :create, :edit, :update, :destroy]
  
end
