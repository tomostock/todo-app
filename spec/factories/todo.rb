FactoryBot.define do
  factory :todo do
    id { 1 }
    title { 'title1' }
    content { 'content1' }
    status { 1 }
  end
  factory :todo2 do
    id { 2 }
    title { 'title2' }
    content { 'content2' }
    status { 1 }
  end
end