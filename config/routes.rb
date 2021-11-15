Rails.application.routes.draw do
  get 'home/top'
  get 'home', to: 'home#top'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'welcome', to: 'welcome#index'
end
