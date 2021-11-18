import React, { Component } from 'react'
import PropTypes from 'prop-types'

//メインのコンポーネント
class Todos extends Component {
  //コンストラクタ。
  //このコンポーネントのstateには絞り込み前のタスク一覧と、絞り込み後のタスク一覧をそれぞれ用意する
  constructor(props){
    super(props)
    this.state = {initialTodos: this.props.todos, todos:[]}
  }

  //ブラウザロード時の処理。
  //最初はタスク全部を表示しておく
  componentDidMount() { 
    this.setState({todos: this.state.initialTodos})
  }
  /* 
    ページ全体のrenderメソッド。
    大事なのは、FilterFormのprops（search）に、上記で定義したsearchByNameを定義しておくこと。
    これにより、Taskコンポーネントのstateにあるtasksを変更することができる。
    そして、変更したtasksを、TaskListコンポーネントにpropsで渡してあげることで、
    絞り込み後のタスク一覧を表示することができる。
  */
  render() {
    return (
      <div>
        <h1>Todoリスト</h1>
        <TodosList todos={this.state.todos} />
      </div>
    )
  }
}

//タスク一覧についてのコンポーネント。
//こちらは上2つのクラスコンポーネントとは違い、関数コンポーネントになっている。
//クラスコンポーネントとは違い、できることが限られているため、シンプルな表示だけしたいときに使う。
const TodosList = (props) => { 
  //タスク一覧を表示する。
  //繰り返し処理にはmap関数を使用。
  return (
    <div className="todos">
        {props.todos.map((todo) =>
          <TodoItem todo={todo} key={todo.id} />
        )}
    </div>
  )
}
//TaskListコンポーネントが受け取るpropsを定義。
//ここではタスク一覧を受け取ることができるように定義しておく。
TodosList.propTypes = {
  todos: PropTypes.array.isRequired
}

//タスクの1つの行を表すコンポーネント。
//上と同様関数コンポーネント。
const TodoItem = (props) => {
  //受け取ったタスクのオブジェクトの値を、それぞれ行のセルに挿入。
  const {title, content, created_at, updated_at} = props.todo
  return (
    <div className="todo">
      <p>{title}</p>
      <p>{content}</p>
      <p>{created_at}</p>
      <p>{updated_at}</p>
    </div>
  )
}
//TaskItemコンポーネントが受け取るpropsを定義。
//ここではタスクオブジェクト。
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

//react-railsではこの行がないとエラーになるっぽい。
//メインとなるクラス名（ここではTask）、ここで書いているクラス名、ファイル名の3つの名前が一緒じゃないと、
//エラーが起こって実行できなかった。
export default Todos