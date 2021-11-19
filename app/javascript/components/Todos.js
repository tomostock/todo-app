import React from 'react'
import PropTypes from 'prop-types'

//メインのコンポーネント
class Todos extends React.Component {

  get axios() {
    const axiosBase = require('axios');
    return axiosBase.create({
        baseURL: process.env.REACT_APP_DEV_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        responseType: 'json'
    });
  }
  //コンストラクタ。
  //このコンポーネントのstateにはタスク一覧を用意する
  constructor(props){
    super(props)
    this.state = {initialTodos: this.props.todos, todos:[]}
    // console.log(this.axios.get('todos'))
  }
  
  //componentDidMountでpropの内容を変化できる
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

//todoの1つの行を表すコンポーネント。上と同様関数コンポーネント。
const TodoItem = (props) => {
  //受け取ったタスクのオブジェクトの値を、それぞれ行のセルに挿入。
  const {id, title, content, created_at, updated_at} = props.todo
  const edit_path = "/todos/" + id + "/edit"

  return (
    <div className="todo">
      <p>{title}</p>
      <p>{content}</p>
      <p>{created_at}</p>
      <p>{updated_at}</p>
      <a href={edit_path}>test</a>
      <button onClick={() => { handleClick(id) }} className="delete-btn">Delete</button>
    </div>
  )
}

// const handleClick = (id) => {
//   const requestOptions = { method: 'delete' }
//   fetch("/todos/" + id, { method: 'delete' }).then((response) => {
//     return response.json();
//   })
// }

//TaskItemコンポーネントが受け取るpropsを定義。
//ここではタスクオブジェクト。
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

//react-railsではこの行がないとエラーになるっぽい。
//メインとなるクラス名、ここで書いているクラス名、ファイル名の3つの名前が一緒じゃないと、
//エラーが起こって実行できなかった。
export default Todos