import React, { Component } from 'react'
import PropTypes from 'prop-types'

//メインのコンポーネント
class Task extends Component {
  //コンストラクタ。
  //このコンポーネントのstateには絞り込み前のタスク一覧と、絞り込み後のタスク一覧をそれぞれ用意する
  constructor(props){
    super(props)
    this.state = {initialTasks: this.props.tasks, tasks:[]}
  }

  //ブラウザロード時の処理。
  //最初はタスク全部を表示しておく
  componentDidMount() { 
    this.setState({tasks: this.state.initialTasks})
  }

  //検索のメソッドをここで用意しておく
  searchByName(name) { 
    const result = this.state.initialTasks.filter((task) => {
      return task.name.toLowerCase().search( name.toLowerCase()) !== -1;
    })
    this.setState({tasks: result})
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
        <h1>タスクリスト</h1>
        <FilterForm search={(name) => this.searchByName(name)} />
        <TaskList tasks={this.state.tasks} />
      </div>
    )
  }
}

//検索フォームのコンポーネント
class FilterForm extends Component{

  //コンストラクタ。ここでは、検索値nameをstateとして持っておく
  constructor(props){
    super(props)
    this.state = {name: ''}
  }

  //検索のテキストボックスの中身が変更された時の処理。
  //stateに検索値を挿入しておく
  onChangeName(event) {
    this.setState({name : event.target.value})
  }

  //検索ボタンをクリックされた時の処理。
  //上記で書いた通り、 Taskのコンポーネントで渡されたsearchメソッドを実行することにより、
  //Taskコンポーネントのstateに、絞り込み後のタスク一覧を表示することができる
  onClickSearch() {
    this.props.search(this.state.name)
  }

  //検索フォームのrenderメソッド。
  render() {
    return (
      <div className="entry">
        <fieldset>
          <legend>検索</legend>
          <div>名前で検索: <input type="text" value={this.state.name} name="name" onChange={(e) => this.onChangeName(e)} placeholder="例：買い物" /> </div>
          <div> <input type="submit" value="検索" onClick={(e) => this.onClickSearch(e)} /> </div>
        </fieldset>
      </div>
    )
  }
}

//タスク一覧についてのコンポーネント。
//こちらは上2つのクラスコンポーネントとは違い、関数コンポーネントになっている。
//クラスコンポーネントとは違い、できることが限られているため、シンプルな表示だけしたいときに使う。
const TaskList = (props) => { 
  //タスク一覧を表示する。
  //繰り返し処理にはmap関数を使用。
  return (
    <div>
      <table className="task">
        <thead  data-type="ok">
          <tr><th>名前</th><th>詳細</th><th>開始日</th><th>終了日</th></tr>
        </thead>
        <tbody>
          {props.tasks.map((task) =>
            <TaskItem task={task} key={task.id} /> )}
         </tbody>
      </table>
    </div>
  )
}
//TaskListコンポーネントが受け取るpropsを定義。
//ここではタスク一覧を受け取ることができるように定義しておく。
TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
}

//タスクの1つの行を表すコンポーネント。
//上と同様関数コンポーネント。
const TaskItem = (props) => {
  //受け取ったタスクのオブジェクトの値を、それぞれ行のセルに挿入。
  const {name, description, start_date, end_date} = props.task
  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>{start_date}</td>
      <td>{end_date}</td>
    </tr>
  )
}
//TaskItemコンポーネントが受け取るpropsを定義。
//ここではタスクオブジェクト。
TaskItem.propTypes = {
  task: PropTypes.object.isRequired
}

//react-railsではこの行がないとエラーになるっぽい。
//メインとなるクラス名（ここではTask）、ここで書いているクラス名、ファイル名の3つの名前が一緒じゃないと、
//エラーが起こって実行できなかった。
export default Task