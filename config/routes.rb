RomanceOfTheThreeKingdoms::Application.routes.draw do

  root :to => 'home#index'

  match 'country' => 'country#index'

  resources 'game_provinces' do
    match 'prevent_crime'  => 'game_provinces/province_safety_patrols#update'
    match 'prevent_famine' => 'game_provinces/province_land_investments#update'
    match 'prevent_fire'   => 'game_provinces/province_fire_preventions#update'
    match 'prevent_flood'  => 'game_provinces/province_flood_preventions#update'
    match 'province_generals'  => 'game_provinces/province_generals#index'
  end

  # scope 'game_provinces' do
  #   match 'prevent_crime'  => 'game_provinces/province_safety_patrols#update'
  #   match 'prevent_famine' => 'province_land_investments#update'
  #   match 'prevent_fire'   => 'province_fire_preventions#update'
  #   match 'prevent_flood'  => 'province_flood_preventions#update'
  # end

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
