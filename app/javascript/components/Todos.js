import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


class Todos extends React.Component {
  
  constructor(props){
    super(props)
    this.state = { initialTodos: this.props.todos, 
                  todos:[],
                  num: 0 }
    //ファンクションの紐付け
    this.numFunc = this.numFunc.bind(this)
  }

  numFunc = (num) => {
    this.setState({num: num})
  }
  
  //最初のレンダリングが完了した直後に呼び出し
  componentDidMount() { 
    this.setState({todos: this.state.initialTodos})
  }

  TodosList = () => { 
    return (
      <div className="todos">
        {this.state.todos.map((todo) =>
          this.TodoItem(todo)
        )}
      </div>
    )
  }

  TodoItem = (todo) => {
    const {id, title, content, created_at, updated_at} = todo
    return (
      <div className="todo" key={id}>
        <p>{title}</p>
        <p>{content}</p>
        <small>{created_at}</small>
        <small>{updated_at}</small>
        <div>
          <button onClick={() => { detailClick(id) }} className="detail-btn">detail</button>
          <button onClick={() => { editClick(id) }} className="edit-btn">edit</button>
          <button onClick={() => { this.deleteClick(id) }} className="delete-btn">Delete</button>
        </div>
      </div>
    )
  }

  deleteClick = (id) => {
    axios.delete("/todos/" + id, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    }).then( res => {
      this.setState({todos: this.state.todos.filter(todo => todo.id !== id)})
    })
  }

  render() {
    return (
      <div>
        <Detail
          num={ this.state.num }
          numChangeFunc={ this.numFunc }
        />
        num:{ this.state.num }
        <h1>Todoリスト</h1>
        {this.TodosList()}
      </div>
    )
  }
}



class Detail extends React.Component {
  // //ポップアップ（モーダル）
  constructor(props){
    super(props)
    this.numIncrement = this.numIncrement.bind(this);
  }

  numIncrement() {
    this.props.numChangeFunc(this.props.num + 1)
  }

  render(){
    return(
      <div>
        <button onClick={ this.numIncrement }>
          num+
        </button>
      </div>
    )
  }
}

const detailClick = (id) => {
  //ポップアップ（モーダル）
}

const editClick = (id) => {
  location.href = "/todos/" + id + "/edit"
}

//以下　関数コンポーネントのもの
// const TodosList = (props) => { 
//   return (
//     <div className="todos">
//       {props.todos.map((todo) =>
//         <TodoItem todos={props} id={todo.id} key={todo.id}/>
//       )}
//     </div>
//   )
// }

// TodosList.propTypes = {
//   todos: PropTypes.array.isRequired
// }

// const TodoItem = (props) => {
//   const todoslist = props.todos
//   const printlist = todoslist.todos.filter(todo => todo.id === props.id)
//   const {title, content, created_at, updated_at} = printlist[0]
//   return (
//     <div className="todo">
//       <p>{title}</p>
//       <p>{content}</p>
//       <small>{created_at}</small>
//       <small>{updated_at}</small>
//       <div>
//         <button onClick={() => { detailClick(props) }} className="edit-btn">detail</button>
//         <button onClick={() => { editClick(props) }} className="edit-btn">edit</button>
//         <button onClick={() => { deleteClick(props) }} className="delete-btn">Delete</button>
//       </div>
//     </div>
//   )
// }

// const deleteClick = (props) => {
//   axios.delete("/todos/" + props.id, {
//     headers: {
//       'X-Requested-With': 'XMLHttpRequest',
//       'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//     }
//   }).then( res => {
//     const todoslist = props.todos
//     const newlist = todoslist.todos.filter(todo => todo.id !== props.id)
//     console.log(newlist)
//     // location.reload()
//     //↑とりあえず今は。表示配列の編集を行い表示させる！
//   })
// }

export default Todos