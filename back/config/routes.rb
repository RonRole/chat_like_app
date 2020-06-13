Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #user
  resources :users, except:[:show, :index] do
    collection do 
      get 'search'
    end
    resources :message_images, module:"users_message_images"
  end

  #session
  get 'login', to: 'sessions#new'
  post 'login', to:'sessions#create'
  delete 'logout', to:'sessions#destroy'

  # talk_room
  resources :talk_rooms do
    collection do
      get 'own'
      get 'join'
      get 'users'
    end

    resources :users, module:"talkroom_users", only: [:index, :create, :destroy] do
      collection do
        get 'author'
        get 'member'
      end
    end
  end
end
