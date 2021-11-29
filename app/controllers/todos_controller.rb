class TodosController < ApplicationController
  
  def index
    @todo = Todo.all.order(id: "DESC")
  end
  
  def new
    @todo = Todo.new
  end

  def create
    Todo.create(todo_params)
    redirect_to todos_path
  end
  
  def edit
    @todo = Todo.find(params[:id])
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update(todo_params)
    redirect_to todos_path
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    redirect_to todos_path
  end

  private

  def todo_params
    params.require(:todo).permit(:title,:content)
  end

end