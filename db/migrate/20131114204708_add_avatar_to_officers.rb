class AddAvatarToOfficers < ActiveRecord::Migration
  def change
    add_column :officers, :avatar, :string
  end
end
