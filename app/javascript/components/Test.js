import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Test = (props) => {
  const [todos, setTodos] = useState(props.todos)

  //関数の実行タイミングをReactのレンダリング後まで
  useEffect(() => {
    setTodos(todos)
  }, [todos])

  const TodosList = () => { 
    return (
      <div className="todos">
        {todos.map((todo) =>
          TodoItem(todo)
        )}
      </div>
    )
  }

  const TodoItem = (todo) => {
    const {id, title, content, created_at, updated_at} = todo
    return (
      <div className="todo" key={id}>
        <p>{title}</p>
        <p>{content}</p>
        <small>{created_at}</small>
        <small>{updated_at}</small>
        <div>
          {/* <button onClick={() => { detailClick(id) }} className="detail-btn">detail</button>
          <button onClick={() => { editClick(id) }} className="edit-btn">edit</button> */}
          <button onClick={() => { deleteClick(id) }} className="delete-btn">Delete</button>
        </div>
      </div>
    )
  }

  const deleteClick = (id) => {
    axios.delete("/todos/" + id, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    }).then( res => {
      setTodos(todos.filter(todo => todo.id !== id))
    })
  }

  return (
    <div>
      <h1>Todoリスト</h1>
      {TodosList()}
    </div>
  )
}

export default Test