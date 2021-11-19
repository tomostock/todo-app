import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'


//メインのコンポーネント
class Todos extends React.Component {

  //コンストラクタ。
  //このコンポーネントのstateにはタスク一覧を用意する
  constructor(props){
    super(props)
    this.state = {initialTodos: this.props.todos, todos:[]}
  }
  
  //componentDidMountでpropの内容を変化できる
  componentDidMount() { 
    this.setState({todos: this.state.initialTodos})
  }

  //ページ全体のrenderメソッド。
  render() {
    return (
      <div>
        <h1>Todoリスト</h1>
        <TodosList todos={this.state.initialTodos} />
      </div>
      
    )
  }
}

//一覧についてのコンポーネント。クラスコンポーネントとは違い、関数コンポーネントになっている。
const TodosList = (props) => { 
  //タスク一覧を表示する。
  return (
    <div className="todos">
        {props.todos.map((todo) =>
          <TodoItem todo={todo} key={todo.id} />
        )}
    </div>
  )
}

TodosList.propTypes = {
  todos: PropTypes.array.isRequired
}

//todoの1つの行を表すコンポーネント。上と同様関数コンポーネント。
const TodoItem = (props) => {
  //受け取ったタスクのオブジェクトの値を、それぞれ行のセルに挿入。
  const {id, title, content, created_at, updated_at} = props.todo

  return (
    <div className="todo">
      <p>{title}</p>
      <p>{content}</p>
      <p>{created_at}</p>
      <p>{updated_at}</p>
      <button onClick={() => { editClick(id) }} className="edit-btn">edit</button>      
      <button onClick={() => { deleteClick(id) }} className="delete-btn">Delete</button>
    </div>
  )
}

const editClick = (id) => {
  location.href = "/todos/" + id + "/edit"
}

const deleteClick = (id) => {
  axios.delete("/todos/" + id, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
  }).then( res => {
    location.reload()
    //↑とりあえず今は。表示配列の編集を行い表示させる！
  })
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

export default Todos