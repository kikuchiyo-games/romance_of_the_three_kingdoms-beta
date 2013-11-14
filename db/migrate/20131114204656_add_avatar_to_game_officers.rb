class AddAvatarToGameOfficers < ActiveRecord::Migration
  def change
    add_column :game_officers, :avatar, :string
  end
end
