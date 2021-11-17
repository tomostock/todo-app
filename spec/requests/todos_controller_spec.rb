require 'rails_helper'

RSpec.describe TodosController, type: :request do

  describe 'GET #index' do
    it 'リクエストが成功すること' do
      get todos_url
      expect(response.status).to eq 200
    end
  end

  describe 'GET #new' do
    it 'リクエストが成功すること' do
      get new_todo_url
      expect(response.status).to eq 200
    end
  end

  describe 'GET #edit' do
    let(:todo) { FactoryBot.create :todo }
    it 'リクエストが成功すること' do
      get edit_todo_url todo
      expect(response.status).to eq 200
    end
  end

  describe 'POST #create' do
    context 'パラメータが妥当な場合' do
      it 'リクエストが成功すること' do
        post todos_url, params: { todo: FactoryBot.attributes_for(:todo) }
        expect(response.status).to eq 302
      end

      it 'TODOが登録されること' do
        expect do
          post todos_url, params: { todo: FactoryBot.attributes_for(:todo) }
        end.to change(Todo, :count).by(1)
      end

      it 'リダイレクトすること' do
        post todos_url, params: { todo: FactoryBot.attributes_for(:todo) }
        expect(response).to redirect_to todos_url
      end
    end

    context 'パラメータが不正な場合' do
      it 'リクエストが成功すること' do
        post todos_url, params: { todo: FactoryBot.attributes_for(:todo, title: nil) }
        expect(response.status).to eq 302
      end
      it 'TODOが登録されないこと' do
        expect do
        post todos_url, params: { todo: FactoryBot.attributes_for(:todo, title: nil) }
        end.to_not change(Todo, :count)
      end

    #   it 'エラーが表示されること' do
    #     post todos_url, params: { todo: FactoryBot.attributes_for(:todo, title: nil) }
    #     expect(response.body).to include 'prohibited this user from being saved'
    #   end
    # end
    end
  end

  describe 'PUT #update' do
    let(:todo) { FactoryBot.create :todo }
    let(:todo2) { FactoryBot.create :todo2 }
    
    context 'パラメータが妥当な場合' do
      it 'リクエストが成功すること' do
        put todo_url todo, params: { todo: FactoryBot.attributes_for(:todo, content: "test content") }
        expect(response.status).to eq 302
      end

      it 'コンテンツが更新されること' do
        expect do
        put todo_url todo, params: { todo: FactoryBot.attributes_for(:todo, content: "test content") }
        end.to change { Todo.find(todo.id).content }.from('content1').to('test content')
      end

      it 'リダイレクトすること' do
        put todo_url todo, params: { todo: FactoryBot.attributes_for(:todo, content: "test content") }
        expect(response).to redirect_to todos_url
      end
    end

    context 'パラメータが不正な場合' do
      it 'リクエストが成功すること' do
        put todo_url todo, params: { todo: FactoryBot.attributes_for(:todo, content: nil) }
        expect(response.status).to eq 302
      end

      it 'ユーザー名が変更されないこと' do
        expect do
          put todo_url todo, params: { todo: FactoryBot.attributes_for(:todo, content: nil) }
        end.to_not change(Todo.find(todo.id), :content)
      end

  #   it 'エラーが表示されること' do
  #     put todo_url todo, params: { todo: FactoryBot.attributes_for(:todo, content: nil) }
  #     expect(response.body).to include 'prohibited this user from being saved'
  #   end
    end
  end

  describe 'DELETE #destroy' do
    let!(:todo) { FactoryBot.create :todo }

    it 'リクエストが成功すること' do
      delete todo_url todo
      expect(response.status).to eq 302
    end

    it 'ユーザーが削除されること' do
      expect do
        delete todo_url todo
      end.to change(Todo, :count).by(-1)
    end

    it 'ユーザー一覧にリダイレクトすること' do
      delete todo_url todo
      expect(response).to redirect_to todos_url
    end
  end
end