import React from "react"
import PropTypes from "prop-types"
import Box from "@material-ui/core/Box";

class Todo extends React.Component {
  render () {
    return (
      <React.Fragment>
        Greetings: {this.props.greeting}
        <p>{ this.props.test }</p>
        <button onClick={() => { newClick(this.props.path) }} className="edit-btn">new</button>
        <p>{this.props.todo}</p>
      </React.Fragment>
    );
  }
}

const newClick = (path) => {
  location.href = path
}

//形チェック
Todo.propTypes = {
  greeting: PropTypes.string
};
export default Todo
