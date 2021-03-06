Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #user
  resources :users do
    collection do 
      get 'search'
    end
    put 'update_password'
    resources :news, module:'user_news', only:[:create]
  end

  resources :message_images
  resources :bgms


  #session
  get 'login', to: 'sessions#new'
  post 'login', to:'sessions#create'
  delete 'logout', to:'sessions#destroy'

  # talk_room
  resources :talk_rooms do
    collection do
      get 'own'
      get 'join'
      post 'search_own'
      post 'search_join'
    end

    resources :users, module:"talkroom_users", only: [:index, :create, :destroy] do
      collection do
        get 'author'
        get 'member'
        delete 'destroy_multiple'
      end
    end
  end

  #news
  resources :news, only: [:index]
end
