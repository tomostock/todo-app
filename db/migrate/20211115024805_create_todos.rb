class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :content
      t.integer :status, default: 1

      t.timestamps
    end
  end
end
