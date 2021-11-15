class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :content
      t.boolean :del_flg, default: false, null: false

      t.timestamps
    end
  end
end
