Rails.application.routes.draw do

  get 'home/top'
  root to: 'home#top'
  get 'welcome', to: 'welcome#index'
  resources :todos, only: [:index, :new, :create, :edit, :update, :destroy]
  
end
