class AddPopulationToProvinces < ActiveRecord::Migration
  def change
    add_column :provinces, :population, :integer
  end
end
