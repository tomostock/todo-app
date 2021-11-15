class TodoController < ApplicationController
  def create
    @todo = Todo.new(
      title:params[:title],
      content:params[:content]
      )
    @todo.save
   end
end