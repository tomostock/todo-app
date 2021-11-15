require 'rails_helper'

RSpec.describe Todo, type: :model do

  it "タイトル、コンテンツ、フラグがある場合、有効である" do
    todo = Todo.new(
      title: "title1",
      content: "content1",
      status:  1,
      )
    # オブジェクトをexpectに渡した時に、有効である(be valid)という意味になります
    expect(todo).to be_valid
  end

  it "タイトルがない場合、無効である" do
    todo = Todo.new(
      title: nil,
      content: "content1",
      status:  1,
      )
    todo.valid?
    # valid?メソッドでfalseであれば、user.errosでどんなerrorを持っているか返してくれます。今回は特に[:first_name]のエラーがみたいのでexpect()内部で指定してあげます。
    # 今回は"can't be blank"というエラーを含んでいる(include)しているはずという記述になります。複数含む場合ももちろんあります。
    expect(todo.errors[:title]).to include("can't be blank")
  end

  it "コンテンツがない場合、無効である" do
    todo = Todo.new(
      title: "title1",
      content: nil,
      status:  1,
      )
    todo.valid?
    expect(todo.errors[:content]).to include("can't be blank")
  end

  it "デリートフラグがない場合、無効である" do
    todo = Todo.new(
      title: "title1",
      content: "content1",
      status:  nil,
      )
    todo.valid?
    expect(todo.errors[:status]).to include("can't be blank")
  end

end