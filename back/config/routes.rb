Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #user
  resources :users
  namespace :users do
    get 'self', to:'self'
  end

  #session
  get 'login', to: 'sessions#new'
  post 'login', to:'sessions#create'
  delete 'logout', to:'sessions#destroy'

  # talk_room
  resources :talk_rooms
  get 'own_talk_rooms', to:'talk_rooms#own_index'
end
