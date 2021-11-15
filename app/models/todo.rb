class Todo < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
  validates :status, presence: true, numericality: {less_than: 2}
end
