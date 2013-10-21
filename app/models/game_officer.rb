class GameOfficer < ActiveRecord::Base
  attr_accessible :leadership, :intelligence, :charm, :politics, :war, :surname, :given_name 
  belongs_to :game
  belongs_to :game_province
end
