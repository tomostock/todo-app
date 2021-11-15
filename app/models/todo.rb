class Todo < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
  validates :del_flg, inclusion: { in: [true, false] }
end
