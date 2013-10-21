class HomeController < ApplicationController
  def index
    user = User.first
    game = user.game
    officers = game.officers
  end
end
