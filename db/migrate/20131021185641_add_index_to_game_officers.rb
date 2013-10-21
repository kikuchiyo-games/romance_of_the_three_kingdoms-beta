class AddIndexToGameOfficers < ActiveRecord::Migration
  def change
    add_column :game_officers, :game_id, :integer
    add_index :game_officers, :game_id, :name => 'game_id_ix'
  end
end
