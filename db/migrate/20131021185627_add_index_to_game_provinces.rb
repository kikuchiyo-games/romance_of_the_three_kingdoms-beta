class AddIndexToGameProvinces < ActiveRecord::Migration
  def change
    add_column :game_provinces, :game_id, :integer
    add_index :game_provinces, :game_id, :name => 'game_id_ix'
  end
end
