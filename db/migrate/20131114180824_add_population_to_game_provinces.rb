class AddPopulationToGameProvinces < ActiveRecord::Migration
  def change
    add_column :game_provinces, :population, :integer
  end
end
