class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :index
      t.string :new
      t.string :create
      t.string :edit
      t.string :update
      t.string :delete

      t.timestamps
    end
  end
end
