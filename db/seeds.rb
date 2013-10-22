# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

default_user = User.create
default_user.name = 'default_user'
default_game = Game.create
default_user.game = default_game
default_user.save!

default_province = GameProvince.new
default_province.name = 'hei fei'
default_province.save!

[ { politics: 90, intelligence: 90, charm: 18, leadership: 95, war: 100, surname: 'lu', given_name: 'bu' },
  { politics: 90, intelligence: 90, charm: 95, leadership: 98, war: 90 , surname: 'cao', given_name: 'cao' },
  { politics: 90, intelligence: 90, charm: 80, leadership: 95, war: 91 , surname: 'zhang', given_name: 'liao' },
  { politics: 90, intelligence: 90, charm: 90, leadership: 90, war: 50 , surname: 'xun', given_name: 'yu' }
].each do |officer|
  default_officer = GameOfficer.new(officer)
  default_officer.game = default_game
  default_officer.save!
  default_province.game_officers << default_officer
end
