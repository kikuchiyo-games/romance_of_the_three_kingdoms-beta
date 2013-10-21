class CreateGameProvinces < ActiveRecord::Migration
  def change
    create_table :game_provinces do |t|
      t.string :name

      t.integer :advisor_id
      t.integer :prefect_id
      t.integer :ruler_id

      t.integer :gold
      t.integer :rice
      t.integer :tax
      t.integer :safety

      t.integer :land
      t.integer :earthquake
      t.integer :fire
      t.integer :flood
      t.integer :commerce

      t.integer :troops

      t.timestamps
    end
  end
end
