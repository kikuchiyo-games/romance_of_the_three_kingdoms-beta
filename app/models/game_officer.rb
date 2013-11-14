class GameOfficer < ActiveRecord::Base
  attr_accessible :leadership, :intelligence, :charm, :politics, :war, :surname, :given_name, :avatar 
  belongs_to :game
  belongs_to :game_province

  # def avatar
  #   "/assets/avatar-#{surname}_#{given_name}.jpeg"
  # end
end
