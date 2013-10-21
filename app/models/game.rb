class Game < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :user
  has_many :game_provinces
  has_many :game_officers
end
