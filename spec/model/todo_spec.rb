require 'rails_helper'

RSpec.describe Todo, type: :model do

  it "タイトル、コンテンツ、フラグがある場合、有効である" do
    todo = FactoryBot.build(:todo)
    # オブジェクトをexpectに渡した時に、有効である(be valid)という意味になります
    expect(todo).to be_valid
  end

  it "タイトルがない場合、無効である" do
    todo = FactoryBot.build(:todo, title: nil)
    todo.valid?
    # valid?メソッドでfalseであれば、user.errosでどんなerrorを持っているか返してくれます。今回は特に[:first_name]のエラーがみたいのでexpect()内部で指定してあげます。
    # 今回は"can't be blank"というエラーを含んでいる(include)しているはずという記述になります。複数含む場合ももちろんあります。
    expect(todo.errors[:title]).to include("can't be blank")
  end

  it "コンテンツがない場合、無効である" do
    todo = FactoryBot.build(:todo, content: nil)
    todo.valid?
    expect(todo.errors[:content]).to include("can't be blank")
  end

  it "デリートフラグがない場合、無効である" do
    todo = FactoryBot.build(:todo, status: nil)
    todo.valid?
    expect(todo.errors[:status]).to include("can't be blank")
  end

  it "デリートフラグが1以上の場合、無効である" do
    todo = FactoryBot.build(:todo, status: 2)
    expect(todo).to_not be_valid
  end

end