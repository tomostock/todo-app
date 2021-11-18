import React from "react"
import PropTypes from "prop-types"
import Box from "@material-ui/core/Box";

class Todo extends React.Component {
  render () {
    return (
      <React.Fragment>
        Greetings: {this.props.greeting}
        <p>{ this.props.test }</p>
        <a href={ this.props.path }>new</a>
        <p>{this.props.todo}</p>
      </React.Fragment>
    );
  }
}

//形チェック
Todo.propTypes = {
  greeting: PropTypes.string
};
export default Todo
