import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



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
        <TodoItem todos={props} id={todo.id} key={todo.id}/>
      )}
    </div>
  )
}

TodosList.propTypes = {
  todos: PropTypes.array.isRequired
}

//todoの1つの行を表すコンポーネント。上と同様関数コンポーネント。
const TodoItem = (props) => {
  const todoslist = props.todos
  const printlist = todoslist.todos.filter(todo => todo.id === props.id)
  //受け取ったタスクのオブジェクトの値を、それぞれ行のセルに挿入。
  const {title, content, created_at, updated_at} = printlist[0]
  return (
    <div className="todo">
      <p>{title}</p>
      <p>{content}</p>
      <small>{created_at}</small>
      <small>{updated_at}</small>
      <div>
        <button onClick={() => { detailClick(props) }} className="edit-btn">detail</button>
        <button onClick={() => { editClick(props) }} className="edit-btn">edit</button>
        <button onClick={() => { deleteClick(props) }} className="delete-btn">Delete</button>
      </div>
    </div>
  )
}

const detailClick = (id, props) => {
  //ポップアップ
}

const editClick = (props) => {
  location.href = "/todos/" + props.id + "/edit"
}

const deleteClick = (props) => {
  axios.delete("/todos/" + props.id, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
  }).then( res => {
    console.log(props.todos)
    // location.reload()
    //↑とりあえず今は。表示配列の編集を行い表示させる！
  })
}


export default Todos