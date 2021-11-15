class Todo < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
  validates :status, presence: true
end
