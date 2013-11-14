# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'factory_girl_rails'
# require "#{Rails.root}/spec/factories/game.rb"
# require "#{Rails.root}/spec/factories/game_officer.rb"
# require "#{Rails.root}/spec/factories/game_province.rb"
# require "#{Rails.root}/spec/factories/user.rb"

module Seed
  def create_user
    FactoryGirl.create(:user)
  end

  def create_game
    FactoryGirl.create(:game)
  end

  def create_game_province
    FactoryGirl.create(:game_province)
  end

  def create_game_officer
    FactoryGirl.create(:zhang_liao)
  end

  def create_user_with_game 
    user = create_user
    game = create_game
    user.game = game
    user.save!
    user
  end

  def create_province
    FactoryGirl.create(:default_province)
  end 

  def create_game_province_with_officers officers
    game_province = create_game_province 
    game_province.game_officers = officers
    game_province.save!
    game_province
  end

  def create_wei_officers user
    officers = []

    [ { avatar: '/assets/avatar-lu_bu.jpeg',      politics: 19, intelligence: 40, charm: 45, leadership: 75, war: 100, surname: 'lu', given_name: 'bu' },
      { avatar: '/assets/avatar-cao_cao.jpg',     politics: 96, intelligence: 93, charm: 95, leadership: 99, war: 90 , surname: 'cao', given_name: 'cao' },
      { avatar: '/assets/avatar-zhang_liao.jpeg', politics: 90, intelligence: 85, charm: 80, leadership: 95, war: 91 , surname: 'zhang', given_name: 'liao' },
      { avatar: '/assets/avatar-xun-yu.jpeg',     politics: 95, intelligence: 95, charm: 97, leadership: 90, war: 50 , surname: 'xun', given_name: 'yu' }
    ].each do |officer_data|
      officer = GameOfficer.new(officer_data)
      officer.game = user.game
      officer.save!
      officers << officer
    end
    officers
  end

  def assign_game_to_game_province game, game_province
    game_province.game = game
    game_province.save!
    game_province
  end

end

include Seed
user = create_user_with_game
game_province = assign_game_to_game_province user.game, create_game_province_with_officers( create_wei_officers(user) )
