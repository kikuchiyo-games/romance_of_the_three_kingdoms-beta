class HomeController < ApplicationController
  def index
    user = User.find_by_name('default_user')
    game = user.game
    officers = game.game_officers
  end
end
