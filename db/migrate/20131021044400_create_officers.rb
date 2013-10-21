class CreateOfficers < ActiveRecord::Migration
  def change
    create_table :officers do |t|
      t.string :surname
      t.string :given_name
      t.string :dream

      t.integer :ruler_id
      t.integer :province_id

      t.integer :war
      t.integer :leadership
      t.integer :intelligence
      t.integer :politics
      t.integer :charm
      t.integer :loyalty

      t.timestamps
    end
  end
end
