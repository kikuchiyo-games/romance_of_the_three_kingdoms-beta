class GameProvince < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :game
  has_many :game_officers
end
