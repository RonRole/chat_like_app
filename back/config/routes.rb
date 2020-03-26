Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #user
  resources :users, except:[:index]

  #session
  get 'login', to: 'sessions#new'
  post 'login', to:'sessions#create'
  delete 'logout', to:'sessions#destroy'

  # talk_room
  resources :talk_rooms do
    collection do
      get 'own'
      get 'join'
    end
    resources :users, module:"talkroom_users", only: [:index, :create, :destroy]
  end
end
